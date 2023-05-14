import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { buttonCSS, linkCSS } from "../src/components/Button";
import { ButtonTop } from "../src/components/ButtonTop";
import { Case, Stack, TitleDivider } from "../src/components/Layout";
import { cssListCats, dataCats, refs } from "./1_routing.base.jsx";

export function Exercise() {
  const router = useRouter();

  return (
    <>
      <TitleDivider>Routing</TitleDivider>
      <Case title="What's a link?" refs={refs.btnVsLink}>
        <Stack gap="24px">
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
            // note: Same as history.back() in react-router
            router.back();
          }}
          css={buttonCSS}
        >
          Go back
        </button>
      </Case>

      <Case title="Generated data">
        {/* 💡 BONUS: Leave this to last. */}
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
      </Case>

      <Case title="Back to top">
        <Stack justifyContent="flex-end" my="12px">
          <ButtonTop
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          />
        </Stack>
      </Case>
    </>
  );
}
