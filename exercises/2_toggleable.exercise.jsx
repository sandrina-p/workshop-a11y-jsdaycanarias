import React from "react";
import { css } from "styled-components";

import { Button, buttonToggleCSS, linkCSS } from "../src/components/Button";
import { Case, IconHeart, Stack } from "../src/components/Layout";

function CaseToggleButton() {
  const [isActiveA, setIsActiveA] = React.useState(false);
  const [isActiveB, setIsActiveB] = React.useState(false);

  return (
    <Case title="Toggle button">
      <Stack>
        <button
          onClick={() => setIsActiveA((status) => !status)}
          data-active={isActiveA}
          css={buttonToggleCSS}
        >
          Like
          <IconHeart />
        </button>

        <button
          onClick={() => setIsActiveB((status) => !status)}
          data-active={isActiveB}
          css={buttonToggleCSS}
        >
          <IconHeart />
        </button>
      </Stack>
    </Case>
  );
}

// ===============

const actionsContainerCSS = css`
  position: relative;
  width: min-content;
  margin-bottom: 8px;
  --val: calc(100% + 2px); /*2px for focus shadow space */
`;

const actionsListCSS = css`
  position: absolute;
  top: 0.4rem;
  left: 100%;
  clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);
  transition: clip-path 150ms ease-in;

  &[data-open="true"] {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    transition: clip-path 200ms ease-out;
  }
`;

function CaseCollapsingContent() {
  const [isActionsOpen, setIsActionsOpen] = React.useState(false);
  const toggleActionsOpen = () => setIsActionsOpen((status) => !status);

  return (
    <Case title="Collapsed content">
      <>
        <nav css={actionsContainerCSS}>
          <Button onClick={toggleActionsOpen}>Actions</Button>
          <div css={actionsListCSS} data-open={isActionsOpen}>
            <ActionsItems />
          </div>
        </nav>

        <p>
          A <a href="#fake-link">dummy link</a> for demo purposes.
        </p>
      </>
    </Case>
  );
}

// ===============

function CaseToggleButtonText() {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <Case title="Toggle state and text">
      <Stack>
        <button
          onClick={() => setIsActive((status) => !status)}
          data-active={isActive}
          css={buttonToggleCSS}
          aria-pressed={isActive}
        >
          {isActive ? "Close" : "Open"}
        </button>
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

const actionsUlCSS = css`
  margin: 0;
  padding: 0;
  list-style: none;
  gap: 4px;
  display: flex;
  margin-left: 8px;
`;

export function ActionsItems() {
  return (
    <ul css={actionsUlCSS}>
      <li>
        <button onClick={() => alert("Imagine Copy")}>Copy</button>
      </li>
      <li>
        <button onClick={() => alert("Imagine Cut")}>Cut</button>
      </li>
      <li>
        <button onClick={() => alert("Imagine Edit")}>Edit</button>
      </li>
    </ul>
  );
}

export const cases = [
  {
    id: "CaseLinkVsButton",
    Exercise: CaseToggleButton,
    briefing: `
Every content element needs at least 3 pieces of information:

- **Role** - The type of element. E.g a button or a list.
- **Name** - The text to identify the element.
- **State** - Applicable to interactive elements. E.g. A button is pressed or a menu is opened.

When one of these pieces can't be provided with native HTML elements, we need to complement
it by using ARIA (Accessible Rich Internet Applications). **ARIA allows us to enhance the HTML semantics of an element.**

There are [more than 45 \`aria-*\` attributes](https://www.w3.org/TR/wai-aria-1.1/#state_prop_def). We'll explore some of the most common.

---

In this exercise, use the Screen Reader to interact with the buttons.
You'll notice that some information is missing. Use ARIA to fix it.
    `,
    resources: [
      {
        name: "Rules of ARIA",
        url: "https://w3c.github.io/using-aria/#notes2",
      },
      {
        name: "Name, Role, Value",
        url: "https://www.w3.org/WAI/WCAG22/quickref/?showtechniques=412#name-role-value",
      },
    ],
  },
  {
    id: "CaseCollapsingContent",
    Exercise: CaseCollapsingContent,
    briefing: `
Hiding content has two perspectives: visual and semantics.
Often we visually hide content, but keep it "visible" for the Assistive Tecnologies, without realizing it.

There are [many ways to hide content](https://kittygiraudel.com/2021/02/17/hiding-content-responsibly/), the most common being:
- \`display: none\` - Completely hidden: visually and sematically
- \`opacity: 0\` - Visually hidden but accessible by keyboard

For example, in the code below the button can still be focused:

    <div style="opacity: 0">
      <button>Get started</button>
    </div>

Another way to hide elements without compromising CSS (animations) is
to use the attribute \`inert\`. This tells the browser to "ignore"
the entire element as if it didn't exist in the DOM.

    <div style="opacity: 0" inert="true">
      <button>Get started</button>
    </div>


---

Use the keyboard to navigate the Actions. You'll noticed the links inside the "Actions"
are still focusable even when visually hidden. 
Make them only accessible when visible.

---

Tip: Use "Accessibility Insights" Chrome extension to debug the Tab stops, at "Adhoc tools >  Tab stops".
    `,
    resources: [
      {
        name: "Hiding content responsibly",
        url: "https://kittygiraudel.com/2021/02/17/hiding-content-responsibly/",
      },
      {
        name: "The inert attribute",
        url: "https://developer.chrome.com/articles/inert/",
      },
      {
        extra: true,
        name: "Animating Details",
        url: "https://css-tricks.com/exploring-what-the-details-and-summary-elements-can-do/",
      },
      {
        extra: true,
        name: "Details are not accordions or menus",
        url: "https://adrianroselli.com/2019/04/details-summary-are-not-insert-control-here.html",
      },
    ],
  },
  {
    id: "CaseToggleButtonText",
    Exercise: CaseToggleButtonText,
    briefing: ``,
    resources: [
      {
        name: "Playing with state",
        url: "https://sarahmhigley.com/writing/playing-with-state/",
      },
    ],
  },
];
