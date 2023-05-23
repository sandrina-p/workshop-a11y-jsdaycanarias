import { css, keyframes } from "styled-components";

import { Case } from "../../src/components/Layout";
import { Chapters } from "../../src/components/pageLayouts/Chapters.jsx";
import { LayoutExercise } from "../../src/components/pageLayouts/LayoutExercise.jsx";

// 🍀 The solution is below at "CaseSkipSolution"

function CaseSkipExercise() {
  return (
    <Case title="Skip navigation">
      {/* 💡 Add the Skip Link here. */}

      <DummyLongNav />

      <div>
        {/* 💡 Connect the skip link to this <div> container */}
        <p>
          The "skip navigation" idea was invented to give screen reader and
          keyboard users the same capability of going directly to the main
          content, which most users take for granted.
        </p>

        <p>
          Learn more about{" "}
          <a href="https://webaim.org/techniques/skipnav/">
            Skip Navigation Links
          </a>{" "}
          technique.
        </p>
      </div>
    </Case>
  );
}

// =============
// =============

const skipLinkCSS = css`
  &:not(:focus) {
    /* Same as .sr-only */
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  &:focus {
    position: fixed;
    top: 0;
    left: 0;

    color: inherit;
    padding: 8px;
    border: 1px solid var(--theme-primary);
    background-color: var(--theme-bg_1);
    box-shadow: var(--theme-focus_shadow);
    outline: none;
  }
`;

const tempRing = keyframes`
30%,
  75% {
    box-shadow: white 0 0 0 1px, #ef7979 0 0 0 3px;
  }
`;

const skipLinkTargetCSS = css`
  &:target {
    animation: ${tempRing} 1500ms;
  }
`;

function CaseSkipSolution() {
  return (
    <Case title="Skip navigation">
      {/* 💡 1/2 Add the href pointing to the target element
       */}
      <a href="#content" css={skipLinkCSS}>
        Skip navigation
        {/* 🍀 In real apps, this link is at the top of 
            the DOM (before "Home" and "Show solution") */}
      </a>

      <DummyLongNav />

      {/* 💡 2/2 The target of that link. */}
      <div id="content" target="-1" css={skipLinkTargetCSS}>
        <p>
          The "skip navigation" idea was invented to give screen reader and
          keyboard users the same capability of going directly to the main
          content, which most users take for granted.
        </p>

        <p>
          Learn more about{" "}
          <a href="https://webaim.org/techniques/skipnav/">
            Skip Navigation Links
          </a>{" "}
          technique.
        </p>
      </div>
    </Case>
  );
}

function DummyLongNav() {
  return (
    <nav aria-label="dummy">
      <ul css={stylesList}>
        <li>
          <a href="#a">Nav Link A</a>
        </li>
        <li>
          <a href="#b">Nav Link B</a>
        </li>
        <li>
          <a href="#c">Nav Link C</a>
        </li>
        <li>
          <a href="#d">Nav Link D</a>
        </li>
        <li>
          <a href="#e">Nav Link E</a>
        </li>
      </ul>
    </nav>
  );
}

const cases = [
  {
    id: "skipLinks",
    Exercise: CaseSkipExercise,
    briefing: `
Let's talk about the websites with a lot of links at the top of the page before the actual main content.

Use just the keyboard to navigate this page. 
It's a lot of nav links to tab until you reach the main content.

The keyboard-only users are forced to tab through every single link before they can reach the main content. 

That isn't very good, right? "Skip Navigation" is the technique created to overcome this.
    `,
    resources: [
      {
        name: "Creating Skip links",
        url: "https://a11y-101.com/development/skip-link",
      },
      {
        name: "Example: Wall Street Journal",
        url: "https://www.wsj.com/",
        extra: true,
      },
    ],
    briefing_bonus: ``,
  },
];

const solutions = [
  {
    Solution: CaseSkipSolution,
    explanation: `
The solution requires two elements: A trigger and a target.

- Trigger: a link at the top of the DOM pointing to the target by id

      <a href="#content" class="skipLink">
        Skip to main content
      </a>

- Target: The content element with the id matching the same name. Older browsers need \`tabindex="-1"\` too.

      <main id="content" tabindex="-1">...</main>

Finally we need to visually hide the skip links by default, and show it only when focused.

    .skipLink:not(:focus) {
      /* .sr-only styles... */
    }

    .skipLink:focus {
      /* link styles when it's visible (focused) */
    }

    ---

**CSS trick:** When creating skip links using id #, we can style using the CSS pseudo-selector \`:target\`.

However with this approach, you'll notice the target animation only works once. 
Because the \`#content\` selector is added to the page URL, when triggered again it will be ignored,
unless the URL no longer contains that selector. To overcome this, you'd need to use JS \`.focus()\` instead.


    `,
  },
];

export const stylesList = css`
  display: flex;
  padding: 0;
  gap: 16px;
  list-style: none;
`;

export default function Page() {
  return <Chapters cases={cases} solutions={solutions} />;
}

Page.getLayout = function getLayout(page) {
  return <LayoutExercise title="Exercise 1: Routing">{page}</LayoutExercise>;
};
