import React from "react";

import { buttonOutlineCSS } from "../src/components/Button";
import { Case, Stack } from "../src/components/Layout";
import { people } from "../src/utils/people.js";
import { stylesTable } from "./7_advanced_keyboard.exercise";

const RovingContext = React.createContext({});

const arrowCode = {
  37: "LEFT",
  38: "UP",
  39: "RIGHT",
  40: "DOWN",
};

function RovingContainer({ children, maxIndex }) {
  const [activeIx, setActiveIx] = React.useState(0);
  const registeredFocusOnRoverEls = React.useRef({});

  function registerFocusOnRoverEl(ix, el) {
    registeredFocusOnRoverEls.current = {
      ...registeredFocusOnRoverEls.current,
      [ix]: el,
    };
  }

  function handleKeyDown(e) {
    const arrowType = arrowCode[e.keyCode]; // LEFT || UP || RIGHT || DOWN

    if (!arrowType) {
      // Do nothing if they didn't click an arrow key
      return;
    }

    e.preventDefault(); // Prevent page scroll

    let newIx;

    if (arrowType === "UP" || arrowType === "LEFT") {
      if (activeIx === 0) {
        // top of the list
        return; // Or you could set the last index (loop).
      }
      newIx = activeIx - 1;
    }

    if (arrowType === "DOWN" || arrowType === "RIGHT") {
      if (activeIx === maxIndex) {
        // bottom of the list.
        return; // Or you could set the first index (loop).
      }
      newIx = activeIx + 1;
    }

    // 💡 Update the new active index!
    setActiveIx(newIx);

    // 💡 Move the focus() to the new active element
    registeredFocusOnRoverEls.current[newIx]?.focus();
  }

  return (
    <RovingContext.Provider value={{ activeIx, registerFocusOnRoverEl }}>
      {React.cloneElement(children, {
        onKeyDown: handleKeyDown,
      })}
    </RovingContext.Provider>
  );
}

function RovingItem({ children, index, focusOnRover }) {
  const elRef = React.useRef();
  const { activeIx, registerFocusOnRoverEl } = React.useContext(RovingContext);
  const isFocusable = activeIx === index;

  React.useEffect(() => {
    if (focusOnRover) {
      // This will be the element that will receive .focus()
      // when the rover (tabindex="0") happens to it.
      registerFocusOnRoverEl(index, elRef.current);
    }
  });

  return React.cloneElement(children, {
    tabIndex: isFocusable ? 0 : -1,
    ref: elRef,
  });
}

function CaseRoving() {
  return (
    <Case title="Roving technique">
      <p>
        Here's a <a href="#a">link</a> just for example.
      </p>

      <h3>Create "Checkout" Team</h3>

      <RovingContainer maxindex={people.length - 1}>
        <table css={stylesTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Job Role</th>
              <th>City</th>
              <th>
                <span className="sr-only">Select</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {people.map((p, ix) => {
              return (
                <tr key={p.userId}>
                  <td>
                    <RovingItem index={ix} focusOnRover>
                      <a href={`#${p.userId}`}>{p.name}</a>
                    </RovingItem>
                  </td>
                  <td>{p.jobRole}</td>
                  <td>
                    <RovingItem index={ix}>
                      <a href={p.cityUrl}>{p.city}</a>
                    </RovingItem>
                  </td>
                  <td>
                    <RovingItem index={ix}>
                      <input
                        type="checkbox"
                        name="people"
                        value={p.userId}
                        aria-label="Promote"
                      />
                    </RovingItem>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </RovingContainer>

      <Stack justifyContent="end">
        <button css={buttonOutlineCSS}>Next step</button>
      </Stack>
    </Case>
  );
}

// ========================
// You can ignore this part
// ========================

// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *

export const solutions = [
  {
    Solution: CaseSkip,
    explanation: `
The solution requires two elements: A trigger and a target.

- Trigger: a link at the top of the DOM pointing to the target by id

      <a href="#content" class="skipLink">
        Skip to main content
      </a>

- Target: The content element with the id matching the same name. Older browsers need \`tabindex="-1"\` too.

      <main id="content" tabindex="-1">...</main>

Finally we need to visually hide the skip links by default and only show it when focused.

    .skipLink:not(:focus) {
      position: absolute;
      width: 1px;
      height: 1px;
      /* rest of .sr-only styles... */
    }

    .skipLink:focus {
      /* link styles when it's focused */
    }
    `,
  },
  {
    Solution: CaseRoving,
    explanation: ``,
  },
];
