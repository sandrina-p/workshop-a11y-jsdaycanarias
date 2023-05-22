import React from "react";
import { css } from "styled-components";

import { Button, buttonToggleCSS } from "../src/components/Button";
import { Case, IconHeart, Stack } from "../src/components/Layout";
import { ActionsItems } from "./2_toggleable.exercise";

function CaseToggleButtons() {
  const [isActiveA, setIsActiveA] = React.useState(false);
  const [isActiveB, setIsActiveB] = React.useState(false);

  return (
    <>
      <Case title="Toggle button">
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

function CaseSolutionCollapsingContent() {
  return (
    <Case title="Collapsed content">
      <ActionsMenuUsingInert />
      <br />
      <ActionsMenuUsingVisibility />
    </Case>
  );
}

function ActionsMenuUsingInert() {
  const [isActionsOpen, setIsActionsOpen] = React.useState(false);
  const toggleActionsOpen = () => setIsActionsOpen((status) => !status);

  return (
    <div>
      <p>Using attr inert</p>
      <nav css={actionsContainerCSS}>
        <Button
          onClick={toggleActionsOpen}
          // 💡 Bonus: aria-expanded tells the SR this will show (expand) something.
          aria-expanded={isActionsOpen}
          // 💡 Bonus: aria-controls allows jumping directly to the menu (only JAWS supports it)
          aria-controls="actionsWithInert"
        >
          Actions
        </Button>
        <div
          data-open={isActionsOpen}
          // 💡 The inert needs a polyfill "wicg-inert" (imported at _app.js)
          // to work properly in every modern browser.
          inert={isActionsOpen ? null : "true"}
          css={actionsListCSS}
          id="actionsWithInert"
        >
          <ActionsItems />
        </div>
      </nav>
    </div>
  );
}

const cssActionsListVisibility = css`
  position: absolute;
  top: 0.4rem;
  left: 100%;
  clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);

  /* 💡 Hide it (visually and semantically) */
  visibility: hidden;

  /* 💡 CSS Trick: */
  /* When hiding, add 150ms delay to the visibility, 
  so it waits for the clip-path transition */
  transition: clip-path 150ms ease-in, visibility 1ms 150ms;

  &[data-open="true"] {
    /* 💡 Show it (visually and semantically)  */
    visibility: visible;

    /* 💡 CSS trick: When showing, visibility does not need a transition. */
    transition: clip-path 200ms ease-out;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
`;

function ActionsMenuUsingVisibility() {
  const [isActionsOpen, setIsActionsOpen] = React.useState(false);
  const toggleActionsOpen = () => setIsActionsOpen((status) => !status);

  return (
    <div>
      <p>Bonus: Using CSS "visibility: hidden"</p>
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

// ============

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
          Play
        </button>
      </Stack>
    </Case>
  );
}

// ===============
// ===============
// ===============

export const solutions = [
  {
    Solution: CaseToggleButtons,
    explanation: ``,
  },
  {
    Solution: CaseSolutionCollapsingContent,
    explanation: ``,
  },
  {
    Solution: CaseToggleButtonText,
    explanation: ``,
  },
];
