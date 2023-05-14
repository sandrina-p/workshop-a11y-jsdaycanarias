import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";

import { buttonCSS, linkCSS } from "../src/components/Button";
import { ButtonTop } from "../src/components/ButtonTop";
import { Case, SROnly, Stack } from "../src/components/Layout";
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
    window.scrollTo({
      top: 0,
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
      <Case title="Back to top">
        <h3 ref={refTitle} tabIndex="-1">
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
                  <a href={`#cat-link/${i}`} css={linkCSS}>
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
      </Case>
    </>
  );
}

export const solutions = [
  {
    Solution: LinkVsButton,
    explanation: `
The overall guideline is:

- \`<div>\`: Never use them for interactive elements, unless you are sure of what you are doing.
- \`<a>\`: For any navigation related with routing.
- \`<button>\`: For contextual actions within the page.

My **personal decision tree** between both: If you can "bookmark" it, then it should be a link.
    `,
  },
  {
    Solution: BackToTop,
    explanation: `
Whenever you create a shortcut, remember to also update the keyboard position (focus).

In this case, you can force an element to be focused 
by using [\`.focus()\` method](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) with \`tabindex="-1"\` attribute.

Although tricky, we have almost full control over the focus management in a webpage.
    `,
  },
];
