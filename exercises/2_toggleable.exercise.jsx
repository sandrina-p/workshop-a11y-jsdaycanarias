/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { css } from "styled-components";

import { Button, buttonToggleCSS } from "../src/components/Button";
import { Case, IconHeart, Stack } from "../src/components/Layout";
import { ActionsItems, actionsContainerCSS, refs } from "./2_toggleable.base";

export function Exercise() {
  return (
    <>
      <CaseToggleButtonsExercise />
      <CaseCollapsingContentExercise />
      <CaseToggleButtonText />
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
          {isActive ? "Close" : "Open"}
        </button>
      </Stack>
    </Case>
  );
}
