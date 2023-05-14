import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { buttonCSS, linkCSS } from "../src/components/Button";
import { ButtonTop } from "../src/components/ButtonTop";
import { Case, Stack } from "../src/components/Layout";
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
      <Case title="Back to top">
        <h3>Cats</h3>
        <Stack>
          <ul css={cssListCats.ul}>
            {dataCats.map(({ url, name }, i) => (
              <li key={i}>
                <Image src={url} alt="Cat_photo" />
                <div css={cssListCats.info}>
                  <span>{name}</span>
                  <a href={`#cat-link/${i}`} css={linkCSS}>
                    View
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

// =============
// =============

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
        extra: true,
        url: "https://www.gatsbyjs.com/blog/2019-07-11-user-testing-accessible-client-routing/",
      },
      {
        name: "Creating a 'Go back' link",
        extra: true,
        url: "https://stackoverflow.com/questions/72676015/react-router-go-back-using-link",
      },
      {
        name: "Creating compliant focus indicators",
        extra: true,
        url: "https://www.sarasoueidan.com/blog/focus-indicators/",
      },
    ],
  },
  {
    id: "CaseBackToTop",
    Exercise: CaseBackToTop,
    briefing: `
At the end of the list there's a button to go back to the top.

It works well with a mouse, but not with the keyboard:
After we trigger the button and then hit \`Tab\`, the focus 
doesn't start from the top of the list. 

How do we fix it?
    `,
    resources: [
      {
        name: "How to use tabindex",
        url: "https://www.a11yproject.com/posts/how-to-use-the-tabindex-attribute/",
      },
    ],
  },
];
