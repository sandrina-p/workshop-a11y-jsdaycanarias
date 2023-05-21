/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";

import svgChat from "../public/imgs/chat.svg";
import imgGSlides from "../public/imgs/gslides.png";
import { Footer } from "../src/components/Footer";
import {
  Banner,
  CardLink,
  LinkExternal,
  PageShell,
  Stack,
} from "../src/components/Layout";

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
          <title>A11Y in JS @JSDayCanarias</title>
          <meta
            name="description"
            content="Workshop - A11Y in JS apps at @JSDayCanarias"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <Title>A11Y in JS apps</Title>
          <Kicker>
            The web is awesome and everyone should be able to enjoy it.
          </Kicker>

          <Banner $tone="danger">
            <span>
              <span className="sr-only">Work in progress</span>
              <span aria-hidden="true">🚧 🚧 🚧</span>
            </span>
            <p>
              Polishing is still being done. Please get the latest version a few
              minutes before the workshop starts.
              <br /> (this banner will then disappear).
            </p>
          </Banner>

          <Stack justifyContent="center">
            <LinkExternal href="https://docs.google.com/presentation/d/1x_d9KlXnoGMsaY3QUSFtLphMpwwteSbyuETvITGgF4s/edit?usp=sharing">
              <Image src={imgGSlides} alt="" />
              Google Slides
            </LinkExternal>
            <LinkExternal href="https://t.me/+B4U8BBq4jaI1YTE0">
              <Image src={svgChat} alt="" />
              Telegram Group
            </LinkExternal>
          </Stack>

          <CardLink title="Routing" href="exercises/1">
            divs, buttons, or anchors?
          </CardLink>
          <CardLink title="Toggleable interfaces" href="exercises/2">
            Every click is an interaction, but not every interaction is a click
          </CardLink>
          <CardLink title="Loading content" href="exercises/3">
            Handling async actions with accessible loadings and results.
          </CardLink>
          <CardLink title="Form fields validations" href="exercises/4">
            If filling forms is boring, imagine filling an unaccessible one!
          </CardLink>
          <CardLink title="Animations" href="exercises/5">
            Making animations more accessible.
          </CardLink>
          <CardLink title="Advanced: Dialog (Modal)" href="exercises/6">
            What does it take to build an accessible Dialog?
          </CardLink>
          <CardLink title="Advanced: Advanced keyboard" href="exercises/7">
            Keyboards have +100 keys. Let's go beyond the <code>Tab</code> key.
          </CardLink>
        </main>
        <Footer />
      </HomeShell>
    </>
  );
}
