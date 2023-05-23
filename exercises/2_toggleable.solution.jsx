import React from "react";
import { css } from "styled-components";

import { Button, buttonToggleCSS } from "../src/components/Button";
import { Case, IconHeart, Stack, StackY } from "../src/components/Layout";
import { usePlayAudio } from "../src/utils";
import { ActionsList } from "./2_toggleable.exercise";

const actionsContainerCSS = css`
  position: relative;
  width: min-content;
  margin: 8px 0;
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

      <p>
        A <a href="#fake-link">dummy link</a> for demo purposes.
      </p>
    </Case>
  );
}

function ActionsMenuUsingInert() {
  const [isActionsOpen, setIsActionsOpen] = React.useState(false);
  const toggleActionsOpen = () => setIsActionsOpen((status) => !status);

  return (
    <div>
      <p>
        Using <code>inert</code> attribute
      </p>
      <nav css={actionsContainerCSS}>
        <Button
          onClick={toggleActionsOpen}
          // 💡 Bonus: aria-expanded tells the SR this will show (expand) something.
          aria-expanded={isActionsOpen}
          // 💡 Bonus: aria-controls allows SR to go directly to the menu
          // But poor support https://github.com/w3c/aria/issues/995
          aria-controls="actionsWithInert"
        >
          Actions
        </Button>
        <div
          data-open={isActionsOpen}
          // 💡 1/1 Add the inert attribute with explicit "true" value
          //   🍀 The inert needs a polyfill "wicg-inert" (already imported at _app.js)
          //      to work properly in every browser.
          inert={isActionsOpen ? null : "true"}
          css={actionsListCSS}
          id="actionsWithInert"
        >
          <ActionsList />
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
      <p>
        Bonus: Using CSS <code>visibility: hidden</code>
      </p>
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
          <ActionsList />
        </div>
      </nav>
    </div>
  );
}

// ============

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
            // aria-label="Like" // 💡 Approach B.
          >
            <IconHeart />
            {/* 💡 Approach A (my favorite): Use .sr-only class.
                  - Every translator tools can catch it.
                  - Pages without CSS will show this text.
            */}
            <span className="sr-only">Like</span>
          </button>
        </Stack>
      </Case>
    </>
  );
}

// ===============

function CaseToggleButtonText() {
  const [isPlayingA, setIsPlayingA] = React.useState(false);
  const [isPlayingB, setIsPlayingB] = React.useState(false);
  const { setAudio } = usePlayAudio();

  function handleClickA() {
    const isPlayingNow = isPlayingA;
    setAudio(isPlayingNow);
    setIsPlayingA(!isPlayingNow);
  }

  function handleClickB() {
    const isPlayingNow = isPlayingB;
    setAudio(isPlayingNow);
    setIsPlayingB(!isPlayingNow);
  }

  return (
    <Case title="Toggle state and text">
      <StackY alignItems="start">
        {/* 💡 Do not mix both aria-pressed and the text
            as explained in the solution */}

        <p>Approach A: Change only the text</p>
        <button
          onClick={() => handleClickA()}
          data-active={isPlayingA}
          css={buttonToggleCSS}
        >
          {/* 💡 Change only the text */}
          {isPlayingA ? "Pause" : "Play"}
        </button>

        <p>Approach B: Use aria-pressed but keep the same semantic text</p>
        <button
          onClick={() => handleClickB()}
          data-active={isPlayingB}
          css={buttonToggleCSS}
          aria-pressed={isPlayingB}
          aria-label="Play"
        >
          {/* Hide the visual text with aria-hidden */}
          <span aria-hidden="true">{isPlayingB ? "Pause" : "Play"}</span>
        </button>
      </StackY>
    </Case>
  );
}

// ===============
// ===============
// ===============

export const solutions = [
  {
    Solution: CaseSolutionCollapsingContent,
    explanation: `
Using inert:   
When the the actions list is visible, add \`inert="true"\` to its container. Short and simple!   
Note: We need the [\`wicg-inert\` polyfill](https://github.com/WICG/inert) for older browsers.

Using CSS:   
When the list is hidden set \`visibility:hidden\`, and when it's visible, set \`visibility:visible\`.   
To preserve the "slide-out" CSS transition when the list closes, we need to apply a \`transition\` delay to the \`visibility\` property,
so that it changes only after the slide with \`clip-path\` ends.

    `,
  },
  {
    Solution: CaseToggleButtons,
    explanation: `
Use \`aria-pressed="true|false"\` to tell when a button is active or not.

For the icon button you could use \`aria-label="Like"\`,
but I prefer using the CSS [\`.sr-only\`](https://www.a11yproject.com/posts/how-to-hide-content/) whenever possible
because:
- it works in every translation tool
- it's visible in pages without CSS
- probably works better with SEO
    `,
  },
  {
    Solution: CaseToggleButtonText,
    explanation: `
Do not mix both text and \`aria-pressed\`, as they are contradictory.

For most toggle buttons I prefer to stick with the same semantic text for both states,
and use \`aria-pressed\` alone, as we did with the "Like" button.

For this particular Play/Pause button already has a immediate feedback (playing the actual sound),
so we could drop the \`aria-pressed\` browser feedback in favor of just changing the text.`,
  },
];
