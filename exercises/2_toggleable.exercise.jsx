import React from "react";
import { css } from "styled-components";

import { Button, buttonToggleCSS } from "../src/components/Button";
import { Case, IconHeart, Stack } from "../src/components/Layout";
import { usePlayAudio } from "../src/utils";

const menuContainerCSS = css`
  position: relative;
  width: min-content;
  margin: 8px 0;
  --val: calc(100% + 2px); /*2px for focus shadow space */
`;

const menuToggleCSS = css`
  position: absolute;
  top: 0;
  left: 100%;
  clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);
  transition: clip-path 150ms ease-in;

  &[data-open="true"] {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    transition: clip-path 200ms ease-out;
  }
`;

function CaseCollapsingContent() {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = () => setIsOpen((status) => !status);

  return (
    <Case title="Collapsed content">
      <>
        <nav css={menuContainerCSS}>
          <Button onClick={toggleOpen}>Menu</Button>
          <div css={menuToggleCSS} data-open={isOpen}>
            <ul css={menuListCSS}>
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="/dashboard">Dashboard</a>
              </li>
              <li>
                <a href="/settings">Settings</a>
              </li>
            </ul>
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
          // 💡 How does the SR know this button is _pressed_?
        >
          Like
          <IconHeart />
        </button>

        <button
          onClick={() => setIsActiveB((status) => !status)}
          data-active={isActiveB}
          css={buttonToggleCSS}
          // 💡 How does the SR know the name/text of this button?
        >
          <IconHeart />
        </button>
      </Stack>
    </Case>
  );
}

// ===============

function CaseToggleButtonText() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const { setAudio } = usePlayAudio();

  function handleClick() {
    const isPlayingNow = isPlaying;
    setAudio(isPlayingNow);
    setIsPlaying(!isPlayingNow);
  }

  return (
    <Case title="Toggle state and text">
      <Stack>
        <button
          onClick={handleClick}
          data-active={isPlaying}
          css={buttonToggleCSS}
          aria-pressed={isPlaying}
        >
          {isPlaying ? "Pause" : "Play"}
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

const menuListCSS = css`
  margin: 0;
  padding: 0;
  list-style: none;
  gap: 12px;
  display: flex;
  margin-left: 8px;
  padding: 4px;
`;

export const cases = [
  {
    id: "CaseCollapsingContent",
    Exercise: CaseCollapsingContent,
    briefing: `
Hiding content has two perspectives: visual and semantics.
Often we hide content visually but forget about hiding it for Assistive Tecnologies.

There are [many ways to hide content](https://kittygiraudel.com/2021/02/17/hiding-content-responsibly/), for example:
- \`display: none\` - Completely hidden: visually and sematically
- \`opacity: 0\` - Visually hidden but accessible by keyboard

In the code below the button can still be focused:

    <div style="opacity: 0">
      <button>Get started</button>
    </div>

Another way to hide elements is by using the attribute \`inert\`. This tells the browser to "ignore"
the entire element as if it didn't exist in the DOM.

    <div style="opacity: 0" inert="true">
      <button>Get started</button>
    </div>

It's super useful if you don't want to compromise CSS animations or SEO.

---

Use the keyboard to navigate the Menu list. You'll noticed the links inside the "Menu"
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
    ],
    briefing_bonus: `
You can toggle UI elements without Javascript by using the HTML element \`<details>\`.
It looks exactly like this "Bonus A11Y" collapsed text that you are looking at,
and you can even [animate it](https://css-tricks.com/exploring-what-the-details-and-summary-elements-can-do/).


    <details>
      <summary>Bonus A11Y</summary>
      Depending on what piece of...
    </details>

Just be mindful of [when to (not) use it](https://adrianroselli.com/2019/04/details-summary-are-not-insert-control-here.html).

---

Note: Please [do not use \`<menu>\` HTML element](https://github.com/w3c/aria-practices/issues/353) In case you were thinking about it, as it has poor browser support. 
`,
  },
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

There are [more than 45 \`aria-*\` attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes). We'll explore some of the most common.

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
      {
        name: "Toggle button vs Checkbox",
        url: "https://uxmovement.com/buttons/when-to-use-a-switch-or-checkbox/",
      },
    ],
  },
  {
    id: "CaseToggleButtonText",
    Exercise: CaseToggleButtonText,
    briefing: `
Use the Screen Reader to interact with the Play/Pause button.
Two things happen when you press it:
- The button label changes
- The aria-pressed values changes.

Depending on the SR, the announcement is slightly different. Here's how Voice Over announces it:
- _"unselected, Play, toggle button"_
- _"selected, Pause, toggle button"_

If the "Pause" is "selected", it means the sound is actually playing. Confusing right?

How can we do better?
`,
    resources: [
      {
        name: "Playing with toggle buttons",
        url: "https://sarahmhigley.com/writing/playing-with-state/",
      },
    ],
  },
];
