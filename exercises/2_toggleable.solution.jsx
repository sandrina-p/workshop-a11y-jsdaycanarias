/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { css } from "styled-components";

import { Button, buttonToggleCSS } from "../src/components/Button";
import { Case, IconHeart, SROnly, Stack } from "../src/components/Layout";
import { useContextExercise } from "../src/components/pageLayouts/LayoutExercise";
import { ActionsItems, actionsContainerCSS, refs } from "./2_toggleable.base";
import { Exercise } from "./2_toggleable.exercise";

function Solution() {
  return (
    <>
      <CaseSolutionToggleButtons />
      <CaseSolutionCollapsingContent />
    </>
  );
}

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

function CaseSolutionCollapsingContent() {
  return (
    <Case title="Collapsed content" refs={refs.hiding}>
      <ActionsMenuSolution />
      <ActionsMenuSolutionVisibility />
      <CaseToggleButtonText />
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

function CaseToggleButtonText() {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <Case title="Toggle toggle with text" refs={refs.toggleStates}>
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

export default function Page() {
  const { variant } = useContextExercise();
  return variant === "exercise" ? <Exercise /> : <Solution />;
}
