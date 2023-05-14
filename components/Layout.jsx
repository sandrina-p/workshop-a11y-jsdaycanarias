import Link from "next/link";
import React from "react";
import { css } from "styled-components";
import styled, { keyframes } from "styled-components";
import { system } from "styled-system";
import {
  color,
  compose,
  flexbox,
  grid,
  layout,
  position,
  space,
} from "styled-system";

import { linkCSS } from "./Button";
import { useContextExercise } from "./pageLayouts/LayoutExercise";

// ============

const composedStyles = compose(color, flexbox, grid, layout, position, space);

export const Box = styled.div.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !composedStyles.propNames.includes(prop) && defaultValidatorFn(prop),
})`
  width: 100%;
  ${composedStyles}
`;

const StackStyled = styled(Box)(system({ gap: { property: "gap" } }));

export const Stack = ({ children, direction, ...props }) => (
  <StackStyled flexDirection={direction} {...props}>
    {children}
  </StackStyled>
);

Stack.defaultProps = {
  direction: "row",
  gap: "16px",
  display: "flex",
};

// ===========

export const Hero = styled.header`
  text-align: center;
  margin-bottom: 60px;

  h1 {
    font-size: 2.1rem;
    margin: 0;
  }

  p {
    color: var(--theme-text_1);
    font-size: 1.4rem;
  }
`;

/////////////////

export const PageShell = styled.div`
  max-width: 56rem;
  width: 100vw;
  min-height: 100vh;
  padding: 3rem 12px;
  margin: auto;

  &[data-variant="exercise"] {
    border-left: 1px dashed var(--theme-text_1);
    border-right: 1px dashed var(--theme-text_1);
  }
  &[data-variant="solution"] {
    /* border-left: 1px dashed var(--theme-text_0);
    border-right: 1px dashed var(--theme-text_0); */
    outline: 100vw solid var(--theme-text_0);
  }
`;

/////////////////

export const Text = styled.span`
  display: block;
  ${({ $align }) =>
    css`
      text-align: ${$align};
    `}
`;

/////////////////

export const TitleDivider = styled.h2`
  margin: 0 0 20px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 2rem;

  &::before,
  &::after {
    content: "";
    flex-grow: 1;
    display: block;
    border-bottom: 1px solid var(--theme-primary);
  }
`;

////////////////

const CardLinkWrapper = styled(Box).attrs({ as: "article" })`
  position: relative;
  width: 100%;
  max-width: var(--theme-width);
  margin: 2rem auto 0;
  padding: 24px 16px;
  border-radius: 4px;
  background-color: var(--theme-bg_1);
  box-shadow: 2px 2px var(--theme-primary_smooth);
  transition: box-shadow 150ms;

  &:hover {
    box-shadow: 2px 2px var(--theme-primary);
    color: var(--theme-primary);
  }

  &:focus-within {
    box-shadow: 0 0 0 4px var(--theme-primary);
  }
`;

const CardLinkTitle = styled.a`
  font-size: 1.8rem;
  font-weight: 500;
  display: inline-block;
  color: inherit;
  text-decoration: none;

  &:focus {
    outline: none;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

const CardLinkHeading = styled.h2`
  margin: 0;
`;

const CardLinkDescription = styled.p`
  color: var(--theme-text_1);
`;

export function CardLink({ title, href, children }) {
  const refLink = React.useRef();

  return (
    <CardLinkWrapper>
      <CardLinkHeading>
        <Link href={href} passHref>
          <CardLinkTitle className="g-cardTitle" ref={refLink}>
            {title}
          </CardLinkTitle>
        </Link>
      </CardLinkHeading>
      <CardLinkDescription>{children}</CardLinkDescription>
    </CardLinkWrapper>
  );
}

////////////////

const CaseBox = styled(Box).attrs({ as: "article" })`
  --pb: ${({ $hasRefs }) => ($hasRefs ? "0" : "32px")};
  position: relative;
  width: 100%;
  max-width: var(--theme-width);
  margin: 3rem auto 0;
  padding: 32px 16px var(--pb);
  border-radius: 4px;
  background-color: var(--theme-bg_1);
  box-shadow: 2px 2px var(--theme-primary_smooth);
`;

const CaseTitle = styled.h2`
  position: absolute;
  top: -30px;
  left: 0;
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0;
`;

const CaseVariant = styled.span`
  position: absolute;
  top: -24px;
  right: 0;
  font-size: 1.4rem;
  font-weight: 400;
  margin: 0;
  color: var(--theme-text_1);
`;

const Refs = styled.footer`
  background: #eee;
  padding: 4px 16px;
  font-size: 1.3rem;
  margin: 32px -16px 0;
`;

export function Case({ title, refs, children }) {
  const { variant } = useContextExercise();

  return (
    <CaseBox $hasRefs={!!refs}>
      <CaseVariant>{variant}</CaseVariant>
      {title && <CaseTitle className="g-cardTitle">{title}</CaseTitle>}
      {children}

      {refs && (
        <Refs>
          Refs:{" "}
          {refs.map(({ name, url }, index) => (
            <span key={name}>
              <a href={url} css={linkCSS} target="_blank" rel="noreferrer">
                {name}
              </a>
              {index + 1 !== refs.length ? ", " : null}
            </span>
          ))}
        </Refs>
      )}
    </CaseBox>
  );
}

/////////////////
export const LinkExternal = styled.a`
  text-decoration: none;
  border-radius: 4px;
  background-color: var(--theme-bg_1);
  box-shadow: 2px 2px var(--theme-primary_smooth);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: var(--theme-text_0);
  gap: 10px;
  padding: 10px;
  width: 16rem;

  img {
    max-width: 50px;
    max-height: 50px;
  }

  &:hover {
    box-shadow: 2px 2px var(--theme-primary);
    color: var(--theme-primary);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px var(--theme-primary);
  }
`;

/////////////////

const FooterStyled = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 8px 16px;
  font-size: 1.4rem;
  text-align: center;
  background: var(--theme-bg_1);
  color: var(--theme-text_1);
`;

export function Footer() {
  return (
    <FooterStyled>
      <Stack justifyContent="center">
        {/* <p>
          Open this codesandbox at{' '}
          <a
            href="https://sandrina-p.net/a11y-in-js"
            target="_blank"
            rel="noreferrer"
            css={linkCSS}
          >
            sandrina-p.net/a11y-in-js
          </a>
        </p> */}
        <p>
          <span>Made without coffee by </span>
          <a
            href="https://twitter.com/a_sandrina_p"
            target="_blank"
            rel="noreferrer"
          >
            Sandrina Pereira
          </a>
          .
        </p>
      </Stack>
    </FooterStyled>
  );
}

///////////

export function IconHeart() {
  return (
    <svg viewBox="0 0 94 83" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M47 78.7248L11.0996 43.7946C11.0984 43.7935 11.0972 43.7923 11.096 43.7911C8.72198 41.4641 6.83589 38.687 5.54807 35.6223C4.25961 32.556 3.59595 29.2635 3.59595 25.9375C3.59595 22.6115 4.25961 19.3189 5.54807 16.2527C6.83654 13.1864 8.72389 10.408 11.0996 8.08034L11.1105 8.06963L11.1214 8.05881C15.1152 4.06493 20.877 2.99905 28.2724 4.84791L28.3887 4.87697L28.5068 4.89667C33.7522 5.7709 40.2105 9.39062 44.8787 14.0588L47 16.1801L49.1213 14.0588C53.7895 9.39062 60.2478 5.7709 65.4932 4.89667L65.6114 4.87697L65.7276 4.84791C73.1231 2.99905 78.8848 4.06493 82.8787 8.05881L82.8895 8.06963L82.9005 8.08034C85.2762 10.408 87.1635 13.1864 88.452 16.2527C89.7404 19.319 90.4041 22.6115 90.4041 25.9375C90.4041 29.2635 89.7404 32.556 88.452 35.6223C87.1641 38.6871 85.2779 41.4643 82.9038 43.7914C82.9027 43.7924 82.9016 43.7935 82.9005 43.7946L47 78.7248Z"
        strokeWidth="10"
        width="1px"
        aria-hidden="true"
      />
    </svg>
  );
}

export function IconArrowTop() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      width="1px"
      aria-hidden="true"
    >
      <path d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"></path>
    </svg>
  );
}

export function IconCart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 902.86 902.86"
      width="1px"
      aria-hidden="true"
    >
      <path d="M671.504 577.829 781.989 145.22H902.86v-68H729.174L703.128 179.2 0 178.697l74.753 399.129h596.751v.003zm14.262-330.641-67.077 262.64h-487.49L81.928 246.756l603.838.432zM578.418 825.641c59.961 0 108.743-48.783 108.743-108.744s-48.782-108.742-108.743-108.742H168.717c-59.961 0-108.744 48.781-108.744 108.742s48.782 108.744 108.744 108.744S277.46 776.858 277.46 716.897c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107 12.59-7.928 26.342-7.928 40.742.001 59.961 48.783 108.744 108.744 108.744zM209.46 716.897c0 22.467-18.277 40.744-40.743 40.744s-40.744-18.277-40.744-40.744c0-22.465 18.277-40.742 40.744-40.742 22.466 0 40.743 18.277 40.743 40.742zm409.702 0c0 22.467-18.277 40.744-40.743 40.744s-40.743-18.277-40.743-40.744c0-22.465 18.277-40.742 40.743-40.742s40.743 18.277 40.743 40.742z" />
    </svg>
  );
}

/////////////////

const jump = keyframes`
  0% {
    opacity: 1;
    transform: translateY(100%);
  }
  50% {
    opacity: 0.3;
    transform: translateY(0%);
  }
  100% {
    opacity: 1;
    transform: translateY(100%);
  }
}
`;

const loaderCSS = css`
  position: relative;
  display: flex;
  gap: 8px;
  height: 40px;

  [data-dot] {
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: var(--theme-primary);
    transform: translateY(100%);
    animation: ${jump} 1.2s ease-in-out infinite;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
`;

export function Loader(props) {
  return (
    <div css={loaderCSS} {...props}>
      <div data-dot></div>
      <div data-dot></div>
      <div data-dot></div>
    </div>
  );
}

// =======

export const modalCSS = css`
  display: none;

  &[data-open="true"] {
    display: block;

    > div {
      position: fixed;
      top: 50vh;
      left: 50vw;
      width: 300px;
      height: auto;
      transform: translate(-50%, -50%);
      background: white;
      padding: 24px;
      z-index: 1;
      box-shadow: 0 0 0 10000px #0000004d;
    }
  }
`;

export const textMonoCSS = css`
  font-family: monospace;
`;

// =========

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`;

export const rotateCSS = css`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  background: tomato;
  animation: none;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${rotate} 4s linear infinite;
  }
`;

export const Banner = styled.article`
  border: 5px dashed var(--theme-text_1);
  font-size: 1.8rem;
  padding: 16px;
  margin: 32px 0;
  text-align: center;

  ${({ $tone }) =>
    $tone === "danger" &&
    css`
      border-color: var(--theme-error);
    `}
`;

//////////////

/* Screen Reader Only
  https://kittygiraudel.com/2021/02/17/hiding-content-responsibly/
*/
export const SROnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;
