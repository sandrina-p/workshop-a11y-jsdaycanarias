/* eslint-disable @next/next/no-html-link-for-pages */
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { css } from "styled-components";

import { Button, buttonCSS } from "../src/components/Button";
import { ButtonTop } from "../src/components/ButtonTop";
import {
  Case,
  IconCart,
  Stack,
  TextNote,
  srOnlyStyles,
} from "../src/components/Layout";
import { cssListCats, dataCats } from "../src/utils/cats";

function CaseLinkVsButton() {
  const router = useRouter();

  return (
    <>
      <Case title="What's a link?">
        <Stack gap="24px">
          {/* 💡 Let's analyze together the caveats
              of each navigation strategy. */}
          <div onClick={() => router.push(`/checkout`)} css={buttonCSS}>
            Checkout div
          </div>

          <button css={buttonCSS} onClick={() => router.push(`/checkout`)}>
            Checkout btn
          </button>

          <a href="/checkout" css={buttonCSS}>
            Checkout anchor
          </a>

          {/* <Link href="/checkout">
            <Button>Checkout link > btn</Button>
          </Link> */}

          {/* <Button>
            <Link href="/checkout">Checkout btn > link</Link>
          </Button> */}

          <a href="/checkout" css={buttonCSS}>
            <IconCart width="16px" />
          </a>
        </Stack>
      </Case>
    </>
  );
}

// ======================
// ======================
// ======================

const skipCSS = css`
  &:not(:focus) {
    // 💡 3/4 Uncomment to apply the .sr-only styles
    /* ${srOnlyStyles}; */
  }

  &:focus {
    // 💡 4/4 Add styles when it's focused:
  }
`;

function CaseSkip() {
  return (
    <Case title="Skip navigation">
      {/* 💡 1/4 Add the Skip Link here */}
      {/* <a href="" css={skipCSS}>
        Skip to main content
      </a> */}

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

      {/* 💡 2/4 Connect the skip link to this <div> container */}
      <div>
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

function CaseBackToTop() {
  const refTitle = useRef();

  function handleToTop() {
    const title = refTitle.current; // access the title element in React
    const titleDistanceFromTop = title.getBoundingClientRect().top;

    window.scrollTo({
      top: window.scrollY + titleDistanceFromTop - 16,
      behavior: "smooth",
    });

    // 💡 1/2 Move the focus to the title
  }
  return (
    <>
      <Case title={`"Back to top" pattern`}>
        {/* 💡 2/2 Turn the title into an interactive element. */}
        <h3 css={cssListCats.title}>Cats</h3>

        <Stack>
          <ul css={cssListCats.ul}>
            {dataCats.map(({ url, name }, i) => (
              <li key={i}>
                <Image src={url} alt="Cat_photo" />
                <div css={cssListCats.info}>
                  <span>{name}</span>
                  <a href={`#cat-link/${name}`}>View</a>
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

export const cases = [
  {
    id: "CaseLinkVsButton",
    Exercise: CaseLinkVsButton,
    briefing: `
You can open these two profiles with your mouse.   
However, it doesn't work with the keyboard.

The goal is to make it work for keyboards too. But wait... what's the difference between a \`<button>\` and \`<a>\`?  
Let's explore that here. 
    `,
    resources: [
      {
        name: "Buttons vs Links",
        url: "https://css-tricks.com/a-complete-guide-to-links-and-buttons/",
      },
      {
        name: "Accessible client routing",
        url: "https://www.gatsbyjs.com/blog/2019-07-11-user-testing-accessible-client-routing/",
      },
    ],
    briefing_bonus: `
- **Focus indicators:**: The styles for \`:hover\` can be subtle, but \`:focus\` indicators _must stand out_,
otherwise people will struggle to find it when using only the keyboard.
Check how to create [compliant focus indicators](https://www.sarasoueidan.com/blog/focus-indicators/). In this workshop all focus indicators are already compliant with [2.4.13 Focus Appearance](https://www.w3.org/TR/WCAG22/#focus-appearance). 
- **Go back links:** Next time you need to create a ["Go Back" link](https://stackoverflow.com/questions/72676015/react-router-go-back-using-link)
be mindful of its caveats. You can check [this sandbox](https://codesandbox.io/s/a11y-into-js-forked-7oq2vq?file=/src/App.js) with the buggy behavior.
`,
    // - **Skip Links:** If your page has a header/nav with a lot of links, consider using [Skip Navigation Links](/extras/SkipNavigation) technique,
    // so that keyboard users can quickly jump to the main content.
  },
  {
    id: "skipLinks",
    Exercise: CaseSkip,
    briefing: `
Let's talk about the websites with a lot of links at the top of the page before the actual main content.
I
The keyboard-only users are forced to tab through every single link before they can reach the main content. 

Similar to this exercise navigation. That isn't very good, right?

We can solve then by using the "Skip Navigation" technique.

This technique requires two elements: A trigger and a target.

- Trigger: a link at the top of the DOM pointing to the target by id

      <a href="#content" class="skipLink">
        Skip to main content
      </a>

- Target: The content element with the id matching the same name. Older browsers need \`tabindex="-1"\` too.

      <main id="content" tabindex="-1">...</main>

Finally we need to visually hide the skip link, and show it only when focused.

    .skipLink:not(:focus) {
      /* .sr-only styles... */
    }

    .skipLink:focus {
      /* link styles when it's visible (focused) */
    }

Go give it a try!
    `,
    resources: [
      {
        name: "Creating Skip Navigation links",
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
  {
    id: "CaseBackToTop",
    Exercise: CaseBackToTop,
    briefing: `
At the end of the list there's a button to go back to the top.

It works well when you click it with a mouse, but not with the keyboard:
After you press the button with \`Enter\` and then hit \`Tab\`, the focus 
goes to "cat facts" link instead of starting from the top of the list. 

To fix it, you need to move the focus to the title with [\`.focus()\` method](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus),
and then make the title an interactive element, by adding \`tabindex="-1"\` attribute.

To fix it, we'll need to use [\`.focus()\`]() How do we fix it?
    `,
    resources: [
      {
        name: "Accessible scroll to top",
        url: "https://ashleemboyer.com/blog/accessible-smooth-scroll-to-top-buttons-with-little-code",
      },
      {
        name: "How to use tabindex",
        url: "https://www.a11yproject.com/posts/how-to-use-the-tabindex-attribute/",
      },
    ],
    briefing_bonus: `
- Images Alt: The \`alt\` attribute is mandatory regardless of the [image category](https://www.w3.org/WAI/tutorials/images/) you use.
If you don't have a [good description](https://jakearchibald.com/2021/great-alt-text/), prefer to leave it empty \`alt=""\`.
Never remove the \`alt\` attribute, otherwise the Screen Reader will read the image url (_yes, it's horrible!_). 
Challenge: Do you think these cats have a good alt? Learn about 
- Unique links: The criteria [2.4.9 Link Purpose (Context)](https://www.w3.org/TR/WCAG21/#link-purpose-in-context) states
that links should be self explanatory in the context.
In the list of cats, all links say "View"... view what?
A solution to fix it is [using CSS to hide part of the link text](https://www.w3.org/WAI/WCAG21/Techniques/css/C7.html).
      `,
  },
];
