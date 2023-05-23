import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { css, keyframes } from "styled-components";

import { Button, buttonCSS } from "../src/components/Button";
import { ButtonTop } from "../src/components/ButtonTop";
import {
  Case,
  IconCart,
  SROnly,
  Stack,
  TextNote,
  srOnlyCSS,
} from "../src/components/Layout";
import { cssListCats, dataCats } from "../src/utils/cats";

export function LinkVsButton() {
  const router = useRouter();

  return (
    <>
      <Case title="What's a link?">
        <Stack gap="24px" flexWrap="wrap">
          {/* 💡 Never do this, unless you are really really sure of your edge-case. */}
          <div onClick={() => router.push(`/checkout`)} css={buttonCSS}>
            Checkout div
          </div>

          {/* 💡 Dealing with route? Use a (or Link) instead! */}
          <button css={buttonCSS} onClick={() => router.push(`/checkout`)}>
            Checkout btn
          </button>

          {/* 💡 Simple and clear. */}
          <a href="/checkout" css={buttonCSS}>
            Checkout anchor
          </a>

          {/* 💡 Use Link to preserver the SPA behaviour (i.e. avoid full-page reload on click). */}
          <Link href="/checkout">Checkout link</Link>

          {/* 💡 Be aware of this Link > Button because the output might 
               me a nested button inside a link which is invalid HTML */}
          <Link href="/checkout">
            <Button>Checkout link > btn</Button>
          </Link>

          {/* 💡 Similarly the same invalid HTML also
                happens with a link inside a button */}
          <Button>
            <Link href="/checkout">Checkout btn > link</Link>
          </Button>

          {/* 💡 In icon-only elements, always provide an invisible label
              for screen readers. The common trick is to use CSS class
              called ".sr-only" (screen-readers-only) */}
          <a href="/checkout" css={buttonCSS}>
            {/* it's defined at globals.css */}
            <span className="sr-only">My checkout</span>
            <IconCart width="16px" />
          </a>
        </Stack>
      </Case>
    </>
  );
}

// ===================
// ===================
// ===================

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
  30%, 75% {
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

      <nav>
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

// ===================
// ===================
// ===================

export function BackToTop() {
  const refTitle = useRef();

  function handleToTop() {
    console.log(refTitle.current);
    const titleDistanceFromTop = refTitle.current.getBoundingClientRect().top;
    window.scrollTo({
      top: window.scrollY + titleDistanceFromTop - 16,
      behavior: "smooth",
    });

    // 💡 Also focus the closest element (the h1)
    // and add a tabindex="-1" to it
    refTitle.current.focus({
      // 💡 Let me scroll be done by window.scrollTo
      preventScroll: true,
    });
  }

  return (
    <>
      <Case title={`"Back to top" pattern`}>
        <h3
          ref={refTitle}
          tabIndex="-1" // Allow JS to programatically focus this element.
          css={cssListCats.title}
        >
          Cats
        </h3>

        <Stack>
          <ul css={cssListCats.ul}>
            {dataCats.map(({ url, name }, i) => (
              <li key={i}>
                {/* 💡 Alt is redundat because the name is right after. So, it can be empty alt="" */}
                <Image src={url} alt="" />
                <div css={cssListCats.info}>
                  <span>{name}</span>
                  <a href={`#cat-link/${i}`}>
                    View
                    {/* 💡 Make the link unique for SRs, using sr-only. */}
                    <SROnly>{name}</SROnly>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </Stack>

        <Stack justifyContent="flex-end" my="12px">
          <ButtonTop onClick={handleToTop} />
        </Stack>

        <TextNote $align="center">
          Yes, I am cat person <span aria-hidden="true">😻</span>, check these{" "}
          <a href="https://www.viagenpets.com/fun-cat-facts/">fun cat facts</a>.
        </TextNote>
      </Case>
    </>
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

export const stylesList = css`
  display: flex;
  padding: 0;
  gap: 16px;
  list-style: none;
`;

export const solutions = [
  {
    Solution: LinkVsButton,
    explanation: `
The overall guideline is:

- \`<div>\`: Never use them for interactive elements, unless you are really sure of what you are doing.
- \`<a>\`: Used for any routing navigation.
- \`<button>\`: Used for contextual actions within the page.

My _personal decision tree_ between both: If you want to _bookmark_ the link, then it should be \`<a>\`.

When using icon-only elements, **always give a semantic name** using the [\`.sr-only\`](https://www.a11yproject.com/posts/how-to-hide-content/) technique.
Do not use \`display: none\` because SR (screen readers) ignore those nodes.
`,
  },
  {
    Solution: CaseSkipSolution,
    explanation: `

Here we replicated the steps described in the briefing 
to add the trigger link (Skip Navigation) and mark the only div as the target area.

---

**CSS trick:** When creating skip links using id #, we can style using the CSS pseudo-selector \`:target\`.

However with this approach, you'll notice the target animation only works once. 
Because the \`#content\` selector is added to the page URL, when triggered again it will be ignored,
unless the URL no longer contains that selector. To overcome this, you'd need to use JS \`.focus()\` instead.


    `,
  },
  {
    Solution: BackToTop,
    explanation: `
Whenever you create a shortcut, remember to also update the keyboard position (focus).

To do so, you need to turn the target (the title) into an focusable element 
using \`tabindex="-1"\` attribute, and then move the focus to it using the [\`.focus()\` method](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus).

The \`-1\` tells that the element is programatically focusable. 
Pressing \`Tab\` doesn't focus it, just by using JavaScript.

Although tricky, know that JS allows us to have almost full control of the focus management in a page.
`,
  },
];
