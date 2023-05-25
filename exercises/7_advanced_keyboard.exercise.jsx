import React from "react";
import { css } from "styled-components";

import { buttonOutlineCSS } from "../src/components/Button";
import { Case, Stack } from "../src/components/Layout";
import { people } from "../src/utils/people.js";

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

[2] Each interactive element (eg link) inside the <RovingContainer>
is wrapped in <RovingItem index={number}> where "index" is the
respective position in the list of elements to be roved.

[1] and [2] are done and connected to the table.

💡 Goal: It's missing to connect the index to the keyboard listener.
Follow the 💡 emoji in 5 places to solve this, from "1/5" to "5/5"
*/

// [1]
function RovingContainer({
  children,
  maxIndex, // total items (eg table rows) to be roved
}) {
  // The current active item by index (eg the active table row)
  const [activeIx, setActiveIx] = React.useState(0);
  const refElementsToBeFocusedOnRover = React.useRef({
    // eg: { 0: link john, 1: link emily, 2: link robert, etc... }
  });

  function setRefElToFocusOnRover(ix, el) {
    refElementsToBeFocusedOnRover.current = {
      ...refElementsToBeFocusedOnRover.current,
      [ix]: el,
    };
  }

  function handleKeyDown(e) {
    const arrowName = arrowsCode[e.keyCode]; // LEFT || UP || RIGHT || DOWN

    console.log("::: handleKeyDown", {
      arrowName,
      activeIx,
      maxIndex,
      setActiveIx,
    });

    if (e.keyCode === "83") {
    }

    if (!arrowName) {
      // Do nothing if the user didn't click an arrow key
      return;
    }

    // 💡 1/5 When the arrow is "UP", go to the previous activeIx

    // 💡 2/5 When the arrow is "DOWN", go to the next activeIx

    // 💡 3/5 Move the focus() to the element in the new active:
    //       You access the active element using:
    //       refElementsToBeFocusedOnRover.current[newActiveIx]

    // 💡 4/5 Prevent default page scroll using
    // console.log(refElementsToBeFocusedOnRover.current)

    // Note: the step 5/5 is at line ~110
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
    tabIndex: undefined,
    ref: elRef,
  });
}

function CaseRovingInitialBoilerplate() {
  return (
    <Case title="Roving technique">
      <h3>Create "Checkout" Team</h3>
      <p>
        This is a <a href="#a">dummy link</a> just for example.
      </p>

      <RovingContainer maxIndex={people.length - 1}>
        <table css={stylesTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Job Role</th>
              <th>City</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {people.map((p, ix) => {
              return (
                <tr key={p.userId}>
                  <td>
                    {/* Added RovingItem to the link. */}
                    <RovingItem index={ix}>
                      <a href={`#${p.userId}`}>{p.name}</a>
                    </RovingItem>
                  </td>
                  <td>{p.jobRole}</td>
                  <td>
                    {/* Added RovingItem to the link */}
                    <RovingItem index={ix} preventedFocusOnRover>
                      <a href={p.cityUrl}>{p.city}</a>
                    </RovingItem>
                  </td>
                  <td>
                    {/* Added RovingItem to the checkbox */}
                    <RovingItem index={ix} preventedFocusOnRover>
                      <input
                        type="checkbox"
                        name="people"
                        value={p.userId}
                        aria-label="Select person"
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

function CaseRovingDoNotCodeHere() {
  // ❌ DO NOT solve the exercise here
  // ❌ Use the one above called CaseRovingInitialBoilerplate.
  return (
    <Case title="Roving technique (original without boilerplate)">
      <h3>Create "Checkout" Team</h3>
      <p>
        This is a <a href="#a">dummy link</a> just for example.
      </p>

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
          {people.map((p) => {
            return (
              <tr key={p.userId}>
                <td>
                  <a href={`#${p.userId}`}>{p.name}</a>
                </td>
                <td>{p.jobRole}</td>
                <td>
                  <a href={p.cityUrl}>{p.city}</a>
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="people"
                    value={p.userId}
                    aria-label="Select person"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

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

export const stylesTable = css`
  border: 1px solid;
  border-collapse: collapse;
  width: 100%;
  margin: 16px 0;

  th {
    padding: 4px 8px;
    text-align: left;
    background: var(--theme-text_0);
    color: var(--theme-text_invert);
  }

  td {
    padding: 4px 8px;
    border-bottom: 1px solid;
  }

  tr:hover {
    background: #eee;
  }

  tr:focus-within {
    /* Whenever any child is focused */
    background: #d6d6ff;
  }

  tr:has(*:focus-visible) {
    /* Add extra focus indicator when using keyboard */
    outline: 3px solid var(--theme-primary);
  }

  th:last-child,
  td:last-child {
    width: 50px;
  }
`;

export const cases = [
  {
    id: "roving-with-boilerplate",
    Exercise: CaseRovingInitialBoilerplate,
    briefing: `
Nagivating this table demands a lot of Tab, Tab Tab. 
Can we make it better? Yes, with the "Roving Tabindex" technique.   

"Roving tabindex" is a strategy to maximize the UX efficiency as much
as possible when navigating a complex app with a keyboard.

With "Roving" you treat complex components as a Single Tab stop, so
the user can quickly bypass it by pressing Tab again. To navigate 
within the complex component, they'll use other keys, for instance, the Arrow keys.

This technique is common in complex Components with a lot of tabs, such as Menus, Tabs, and even long Navigations. 

---

To help you solve this, some boilerplate is already done.
It uses React Context. Read the code for instructions.
`,
    resources: [
      {
        name: "Video: Roving tabindex",
        url: "https://www.youtube.com/watch?v=uCIC2LNt0bk",
      },
      {
        name: "Demo: Toolbar by WAI",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/",
      },
    ],
    briefing_bonus: `
- Empty table headers: The last table column does not has a visual title. Remember to add a hidden one for semantics, using the \`.sr-only\` technique.
- Unique actions: Each checkbox has a hidden label "Select person". We can make it more unique
so that SRs users can easily identify it when using the [VO Routor](https://www.a11yproject.com/posts/getting-started-with-voiceover/#the-web-item-rotor).

If you ever need other tools to help you with focus management, I recommend [\`discord/focus-ring\`](https://github.com/discord/focus-rings) and [\`react-aria\` focus hooks](https://react-spectrum.adobe.com/react-aria/FocusScope.html).
`,
  },
  {
    id: "roving-do-not-code-here",
    Exercise: CaseRovingDoNotCodeHere,
    briefing: `
Please ignore this scenario and solve the problem using the demo above.
This is missing the boilerplate that will help you solve the exercise quicker.
    `,
  },
];
