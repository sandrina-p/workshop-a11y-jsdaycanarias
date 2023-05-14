/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { css } from "styled-components";

import { Button, buttonToggleCSS } from "../components/Button";
import { Case, IconHeart, Stack } from "../components/Layout";
import { useContextExercise } from "../components/pageLayouts/LayoutExercise";

function Exercise() {
  return (
    <>
      <CaseToggleButtonsExercise />
      <CaseCollapsingContentExercise />
      <CaseDetailsElExercise />
    </>
  );
}

// ===============

function CaseToggleButtonsExercise() {
  const [isActiveA, setIsActiveA] = React.useState(false);
  const [isActiveB, setIsActiveB] = React.useState(false);

  return (
    <Case title="Toggle button" refs={refs.toggleStates}>
      <Stack>
        <button
          onClick={() => setIsActiveA((status) => !status)}
          data-active={isActiveA}
          css={buttonToggleCSS}
          aria-pressed={isActiveA}
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

function CaseCollapsingContentExercise() {
  return (
    <Case title="Collapsed content" refs={refs.hiding}>
      <ActionsMenuExercise />
    </Case>
  );
}

const actionsListCSS = css`
  position: absolute;
  top: 0.4rem;
  left: 100%;
  clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);
  transition: clip-path 150ms ease-in, visibility 1ms 200ms;

  &[data-open="true"] {
    transition: clip-path 200ms ease-out, visibility 1ms 1ms;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
`;

function ActionsMenuExercise() {
  const [isActionsOpen, setIsActionsOpen] = React.useState(false);
  const toggleActionsOpen = () => setIsActionsOpen((status) => !status);

  return (
    <>
      <nav css={actionsContainerCSS}>
        <Button onClick={toggleActionsOpen}>Actions</Button>
        <div css={actionsListCSS} data-open={isActionsOpen}>
          <ActionsItems />
        </div>
      </nav>
    </>
  );
}

// ===============

function CaseDetailsElExercise() {
  return (
    <Case title="Details element" refs={refs.detailsEl}>
      <details>
        <summary>What is &lt;details&gt; HTML element</summary>
        This HTML element creates a disclosure widget in which information is
        visible only when the widget is toggled into an "open" state. A summary
        or label must be provided using the &lt;summary&gt; element.
      </details>
    </Case>
  );
}

/*

*
*
*
*
*
*
*
*
*
*

🚨   SPOILERS AHEAD   🚨

🛑 DO NOT SCROLL MORE 🛑 

🙈   SOLUTION BELOW   🙈


*
*
*
*
*
*
*
*
*
*

*/

function Solution() {
  return (
    <>
      <CaseSolutionToggleButtons />
      <CaseSolutionCollapsingContent />
      <CaseSolutionDetailsEl />
    </>
  );
}

// ===============

function CaseSolutionToggleButtons() {
  const [isActiveA, setIsActiveA] = React.useState(false);
  const [isActiveB, setIsActiveB] = React.useState(false);

  return (
    <>
      <Case title="Toggle button" refs={refs.toggleStates}>
        <Stack>
          <button
            onClick={() => setIsActiveA((status) => !status)}
            css={buttonToggleCSS}
            // 💡 Use aria-pressed to add semantic info about the button status
            aria-pressed={isActiveA}
          >
            Like
            <IconHeart />
          </button>

          <button
            onClick={() => setIsActiveB((status) => !status)}
            css={buttonToggleCSS}
            aria-pressed={isActiveB}
          >
            <IconHeart />
            {/* 💡 Tell SR (Screen Reader)s what's the button name. */}
            <span className="sr-only">Like</span>
          </button>
        </Stack>
      </Case>
    </>
  );
}

// ===============
// ===============

function CaseSolutionCollapsingContent() {
  return (
    <Case title="Collapsed content" refs={refs.hiding}>
      <ActionsMenuSolution />
      <ActionsMenuSolutionVisibility />
    </Case>
  );
}

function ActionsMenuSolution() {
  const [isActionsOpen, setIsActionsOpen] = React.useState(false);
  const toggleActionsOpen = () => setIsActionsOpen((status) => !status);

  return (
    <div>
      <p>Using attr inert</p>
      <div css={actionsContainerCSS}>
        <Button
          onClick={toggleActionsOpen}
          // 💡 aria-expanded tells the SR this will expand something else.
          aria-expanded={isActionsOpen}
          // 💡 aria-controls allows jumping directly to the menu (only JAWS supports it)
          aria-controls="actionsWithInert"
        >
          Actions
        </Button>
        <nav
          data-open={isActionsOpen}
          // 💡 The inert needs a polyfill "wicg-inert" (imported at _app.js)
          // to work properly in every modern browser.
          inert={isActionsOpen ? null : "true"}
          css={actionsListCSS}
          id="actionsWithInert"
        >
          <ActionsItems />
        </nav>
      </div>
    </div>
  );
}

const cssActionsListVisibility = css`
  ${actionsListCSS};

  /* Make the visibility change only after clip-path transition is finished (delay of 200ms */
  transition: clip-path 150ms ease-in, visibility 1ms 150ms;
  /* hide it from Assistive Technologies (ie. Keyboard, Screen Readers, etc...) */
  visibility: hidden;

  &[data-open="true"] {
    visibility: visible;
    transition: clip-path 200ms ease-out;
  }
`;

function ActionsMenuSolutionVisibility() {
  const [isActionsOpen, setIsActionsOpen] = React.useState(false);
  const toggleActionsOpen = () => setIsActionsOpen((status) => !status);

  return (
    <div>
      <p>Using CSS visibility</p>
      <nav css={actionsContainerCSS}>
        <Button
          onClick={toggleActionsOpen}
          // 💡 Tell the menu status (expanded vs collapsed)
          aria-expanded={isActionsOpen}
          // 💡 Allows SR to jump directly to the respective menu
          aria-controls="actionsWithVisibility"
        >
          Actions
        </Button>
        <div
          css={cssActionsListVisibility}
          data-open={isActionsOpen}
          id="actionsWithVisibility"
        >
          <ActionsItems />
        </div>
      </nav>
    </div>
  );
}

// ===============

function CaseSolutionDetailsEl() {
  return (
    // 💡 Nothing changes here, it's still HTML!
    <Case title="Details element" refs={refs.detailsEl}>
      <details>
        <summary>What is &lt;details&gt; HTML element</summary>
        This HTML element creates a disclosure widget in which information is
        visible only when the widget is toggled into an "open" state. A summary
        or label must be provided using the &lt;summary&gt; element.
      </details>
    </Case>
  );
}

// =============
// =============
// =============
// =============

// Unrelevant boilerplate code / data / css for this exercise

export default function Page() {
  const { variant } = useContextExercise();
  return variant === "exercise" ? <Exercise /> : <Solution />;
}

// ....

var refs = {
  toggleStates: [
    {
      name: "Rules of ARIA",
      url: "https://w3c.github.io/using-aria/#notes2",
    },
    {
      name: "Name, Role, Value",
      url: "https://www.w3.org/WAI/WCAG22/quickref/?showtechniques=412#name-role-value",
    },
    {
      name: "Playing with state",
      url: "https://sarahmhigley.com/writing/playing-with-state/",
    },
  ],
  hiding: [
    {
      name: "Hiding content responsibly",
      url: "https://kittygiraudel.com/2021/02/17/hiding-content-responsibly/",
    },
    {
      name: "The inert attribute",
      url: "https://developer.chrome.com/articles/inert/",
    },
  ],
  detailsEl: [
    {
      name: "Animating Details",
      url: "https://css-tricks.com/exploring-what-the-details-and-summary-elements-can-do/",
    },
    {
      name: "Details are not accordions/menus/etc",
      url: "https://adrianroselli.com/2019/04/details-summary-are-not-insert-control-here.html",
    },
  ],
};

const actionsContainerCSS = css`
  position: relative;
  width: min-content;
  margin-bottom: 8px;
  --val: calc(100% + 2px); /*2px for focus shadow space */
`;

const actionsUlCSS = css`
  margin: 0;
  padding: 0;
  list-style: none;
  gap: 4px;
  display: flex;
`;

function ActionsItems() {
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
