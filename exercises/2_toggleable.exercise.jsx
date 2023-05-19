/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { css } from "styled-components";

import { Button, buttonToggleCSS } from "../src/components/Button";
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

const actionsUlCSS = css`
  margin: 0;
  padding: 0;
  list-style: none;
  gap: 4px;
  display: flex;
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
      </>
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

// ===============

function CaseToggleButtonText() {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <Case title="Toggle toggle with text">
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

export const cases = [
  {
    id: "CaseLinkVsButton",
    Exercise: CaseToggleButton,
    briefing: ``,
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
    briefing: ``,
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
