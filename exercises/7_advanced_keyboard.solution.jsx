import React from "react";

import { buttonOutlineCSS } from "../src/components/Button";
import { Case, Stack } from "../src/components/Layout";
import { people } from "../src/utils/people.js";
import { stylesTable } from "./7_advanced_keyboard.exercise";

const arrowsCode = {
  37: "LEFT",
  38: "UP",
  39: "RIGHT",
  40: "DOWN",
};

const RovingContext = React.createContext({});

/* 💡💡💡💡 INSTRUCTIONS / SUBTITLES
[1] The table is wrapped by <RovingContainer> which manages
the onKeyDown() listener to detect the up/down key press.

[2] Each interactive element (eg link) inside the table with <RovingContainer>
is wrapped in <RovingItem index={number}> where "index" is the
respective position in the list of elements to be roved.

🎯 Goal: [1] and [2] are done and connected to the Table.

Follow the 💡 emoji in 5 places to solve this, from "1/5" to "5/5"
*/

function RovingContainer({ children, maxIndex }) {
  const [activeIx, setActiveIx] = React.useState(0);
  const refElsPreventedFocusOnRover = React.useRef({});

  function setRefElToFocusOnRover(ix, element) {
    refElsPreventedFocusOnRover.current = {
      ...refElsPreventedFocusOnRover.current,
      [ix]: element,
    };
  }

  function handleKeyDown(e) {
    const arrowType = arrowsCode[e.keyCode]; // LEFT || UP || RIGHT || DOWN

    if (!arrowType) {
      // Do nothing if the user didn't click an arrow key
      return;
    }

    let newIx;

    // 💡 1/5 When the arrow is "UP", go to the previous activeIx
    if (arrowType === "UP" || arrowType === "LEFT") {
      if (activeIx === 0) {
        return; // Or you could set the last index (loop)
      }
      newIx = activeIx - 1;
    }

    // 💡 2/5 When the arrow is "DOWN", go to the next activeIx
    if (arrowType === "DOWN" || arrowType === "RIGHT") {
      if (activeIx === maxIndex) {
        return; // Or you could set the first index (loop)
      }
      newIx = activeIx + 1;
    }

    setActiveIx(newIx);

    // 💡 3/5 Move the focus() to the element in the new active:
    refElsPreventedFocusOnRover.current[newIx]?.focus();

    // 💡 4/5 Prevent default page scroll
    e.preventDefault();
  }

  return (
    // Children (eg table) cloned to add the onKeyDown listener
    <RovingContext.Provider value={{ activeIx, setRefElToFocusOnRover }}>
      {React.cloneElement(children, {
        onKeyDown: handleKeyDown,
      })}
    </RovingContext.Provider>
  );
}

function RovingItem({
  children,
  // Number: The index this item belongs to when rovering.
  index,
  // Boolean: Prevent focusing this element when the
  // the roving (tabindex="0") reaches it.
  preventedFocusOnRover,
}) {
  const elRef = React.useRef();
  const { activeIx, setRefElToFocusOnRover } = React.useContext(RovingContext);
  const isFocusable = activeIx === index;

  React.useEffect(() => {
    if (!preventedFocusOnRover) {
      setRefElToFocusOnRover(index, elRef.current);
    }
  }, [index, preventedFocusOnRover, setRefElToFocusOnRover]);

  // Element cloned to add tabindex="0" or tabindex="-1" based
  // on the current activate roving state
  return React.cloneElement(children, {
    // 💡 5/5 Change the tabIndex to 0 or -1 based
    // on if this item's index matches the activeIx from the Context
    tabIndex: isFocusable ? 0 : -1,
    ref: elRef,
  });
}

function CaseRoving() {
  return (
    <Case title="Roving technique">
      <h3>Create "Checkout" Team</h3>
      <p>
        This is a <a href="#a">dummy link</a> just for example.
      </p>

      <RovingContainer maxindex={people.length - 1}>
        <table css={stylesTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Job Role</th>
              <th>City</th>
              <th>
                {/* 🍀 Bonus: Always name your columns, even the invisible ones. */}
                <span className="sr-only">Select</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {people.map((p, ix) => {
              return (
                // 💡 Added RovingItem to each interactive element.
                <tr key={p.userId}>
                  <td>
                    {/* 💡 Added RovingItem to the link. */}
                    <RovingItem index={ix}>
                      <a href={`#${p.userId}`}>{p.name}</a>
                    </RovingItem>
                  </td>
                  <td>{p.jobRole}</td>
                  <td>
                    {/* 💡 Added RovingItem to the link */}
                    <RovingItem index={ix} preventedFocusOnRover>
                      <a href={p.cityUrl}>{p.city}</a>
                    </RovingItem>
                  </td>
                  <td>
                    {/* 💡 Added RovingItem to the checkbox */}
                    <RovingItem index={ix} preventedFocusOnRover>
                      <input
                        type="checkbox"
                        name="people"
                        value={p.userId}
                        // 🍀 Bonus: Give unique names to your interactive actions
                        aria-label={`Select ${p.name}`}
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
    Solution: CaseRoving,
    explanation: `
Different solutions are possible for this exercise.
This one is using React Context to store the state of the current active table row,
and manage the event listeners to the key down.

Read the code comments to better understand the code flow.

---

Implementing a Roving System with a large browser support has a few caveats. I recommend you to take a look at
other A11Y libraries source code to learn from them, such as [reach/tabs](https://github.com/reach/reach-ui/blob/43f450db7bcb25a743121fe31355f2294065a049/packages/descendants/src/reach-descendants.tsx#L197) or [radix-ui/roving-focus](https://github.com/radix-ui/primitives/tree/main/packages/react/roving-focus).
`,
  },
  {},
];
