import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { buttonCSS } from "../src/components/Button";
import { ButtonTop } from "../src/components/ButtonTop";
import { Case, Stack, TextNote } from "../src/components/Layout";
import { cssListCats, dataCats } from "../src/utils/cats";

function CaseLinkVsButton() {
  const router = useRouter();

  return (
    <>
      <Case title="What's a link?">
        <Stack gap="24px">
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

function CaseBackToTop() {
  function handleToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <>
      <Case title={`"Back to top" pattern`}>
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

export const cases = [
  {
    id: "CaseLinkVsButton",
    Exercise: CaseLinkVsButton,
    briefing: `
You can open these two profiles with your mouse.   
However, it doesn't work with the keyboard.

Make it work for keyboards too but wait... what's the difference between a \`<button>\` and \`<a>\`?   
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
- **Skip Links:** If your page has a header/nav with a lot of links, consider using [Skip Navigation Links](/extras/SkipNavigation) technique,
so that keyboard users can quickly jump to the main content.
`,
  },
  {
    id: "CaseBackToTop",
    Exercise: CaseBackToTop,
    briefing: `
At the end of the list there's a button to go back to the top.

It works well with a mouse, but not with the keyboard:
After you press the button with \`Enter\` and then hit \`Tab\`, the focus 
goes to "cat facts" link instead of starting from the top of the list. 

How do we fix it?
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
