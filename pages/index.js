import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";

import { Footer } from "../components/Footer";
import {
  Banner,
  CardLink,
  LinkExternal,
  PageShell,
  Stack,
} from "../components/Layout";
import imgGSlides from "../public/imgs/gslides.png";
import imgSlack from "../public/imgs/slack.png";

/*eslint-disable @next/next/no-img-element */

const HomeShell = styled(PageShell)`
  max-width: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow-x: hidden;
  --theme-width: 50rem;

  main {
    max-width: var(--theme-width);
    width: 100%;
    margin: auto;
    padding: 3rem 12px 0;
  }
`;

const Title = styled.h1`
  text-align: center;
  line-height: 1.2;
  margin: 0;
`;

const Kicker = styled.p`
  text-align: center;
  color: var(--theme-text_1);
  margin: 1rem 0 5rem;
`;

export default function Home() {
  return (
    <>
      <HomeShell>
        <Head>
          <title>A11Y in JS @ReactAlicante</title>
          <meta
            name="description"
            content="Workshop - A11Y in JS apps at @reactAlicante"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <Title>A11Y in JS apps</Title>
          <Kicker>The web is awesome and everyone should enjoy it.</Kicker>

          {/* <Banner $tone="danger">
            <span>
              <span className="sr-only">Work in progress</span>
              <span aria-hidden="true">🚧 🚧 🚧</span>
            </span>
            <p>
              Polishing is still being done. Please get the latest version a few
              minutes before the workshop starts.
              <br /> (this banner will then disappear).
            </p>
          </Banner> */}

          <Stack justifyContent="center">
            <LinkExternal href="https://docs.google.com/presentation/d/1x_d9KlXnoGMsaY3QUSFtLphMpwwteSbyuETvITGgF4s/edit?usp=sharing">
              <Image src={imgGSlides} alt="" />
              Google Slides
            </LinkExternal>
            <LinkExternal href="https://join.slack.com/t/reactalicante/shared_invite/zt-1gttdn137-CnfS61yfY~0plpmmILv_ug">
              <Image src={imgSlack} alt="" />
              #workshop-a11y
            </LinkExternal>
          </Stack>

          <CardLink title="Routing" href="exercises/1">
            How routing affects navigation links.
          </CardLink>
          <CardLink title="Toggleable interfaces" href="exercises/2">
            What we need to take into account with dynamic content.
          </CardLink>
          <CardLink title="Error Handling" href="exercises/3">
            Handling error states in an accesible way.
          </CardLink>
          <CardLink title="Animations" href="exercises/4">
            Making animations more accessible.
          </CardLink>
          <CardLink title="All together now" href="exercises/5">
            A final challenge wrapping all learnings together.
          </CardLink>
        </main>
        <Footer />
      </HomeShell>
    </>
  );
}
