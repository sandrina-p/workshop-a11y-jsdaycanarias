import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";

import { buttonCSS, linkCSS } from "../src/components/Button";
import { ButtonTop } from "../src/components/ButtonTop";
import { Case, SROnly, Stack, TitleDivider } from "../src/components/Layout";
import { useContextExercise } from "../src/components/pageLayouts/LayoutExercise";
import { cssListCats, dataCats, refs } from "./1_routing.base.jsx";
import { Exercise } from "./1_routing.exercise";

function Solution() {
  const router = useRouter();
  const refTitle = useRef();

  return (
    <>
      <TitleDivider ref={refTitle} tabIndex="-1">
        Routing
      </TitleDivider>

      {/* 💡 Nothing changes here */}
      <Case title="What's a link?" refs={refs.btnVsLink}>
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

      <Case title="Go back button" refs={refs.btnAreLinks}>
        <button
          onClick={() => {
            // 💡 Verify if previous page exists before using router.back
            const hasPreviousPage = window.history.length > 1;

            if (hasPreviousPage) {
              router.back();
            } else {
              // fallback to a meaningful route.
              router.push("/");
            }
            // P.S. You could isolate this logic into a "<GoBackButton />
          }}
          css={buttonCSS}
        >
          Go back
        </button>
      </Case>

      <Case title="Generated data">
        <h3>Cats</h3>

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
      </Case>

      <Case title="Back to top">
        <Stack justifyContent="flex-end" my="12px">
          <ButtonTop
            onClick={() => {
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
            }}
          />
        </Stack>
      </Case>
    </>
  );
}

// =============

export default function Page() {
  const { variant } = useContextExercise();
  return variant === "exercise" ? <Exercise /> : <Solution />;
}
