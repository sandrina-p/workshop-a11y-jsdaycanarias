import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";

import { buttonCSS } from "../src/components/Button";
import { ButtonTop } from "../src/components/ButtonTop";
import { Case, SROnly, Stack, TextNote } from "../src/components/Layout";
import { cssListCats, dataCats } from "../src/utils/cats";

export function LinkVsButton() {
  const router = useRouter();

  return (
    <>
      <Case title="What's a link?">
        <Stack gap="24px">
          {/* 💡 Whenever you deal with routes directly, use a Link instead of div/button */}
          <div onClick={() => router.push(`/profile`)} css={buttonCSS}>
            My profile A
          </div>

          <Link href="/profile" passHref>
            <a css={buttonCSS}>My profile B</a>
          </Link>
        </Stack>
      </Case>
    </>
  );
}

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

export const solutions = [
  {
    Solution: LinkVsButton,
    explanation: `
The overall guideline is:

- \`<div>\`: Never use them for interactive elements, unless you are really sure of what you are doing.
- \`<a>\`: Used for any routing navigation.
- \`<button>\`: Used for contextual actions within the page.

My **personal decision tree** between both: If you want to _bookmark_ the link, then it should be \`<a>\`.
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

---
Although tricky, know that JS allows us to have almost full control of the focus management in a webapp.

If you ever need more advanced focus managements, I recommend you to look at [\`discord/focus-ring\`](https://github.com/discord/focus-rings) and [\`react-aria\` focus hooks](https://react-spectrum.adobe.com/react-aria/FocusScope.html).
`,
  },
];
