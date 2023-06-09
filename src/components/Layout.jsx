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

export const StackXCenter = styled(Stack)`
  align-items: center;
`;

export const StackY = styled(Stack)`
  flex-direction: column;
`;

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
  width: 100vw;
  min-height: 100vh;
  padding: 3rem 12px;
  margin: auto;
`;

/////////////////

export const Text = styled.span`
  display: block;
  ${({ $align }) =>
    css`
      text-align: ${$align};
    `}
`;

export const TextNote = styled(Text)`
  font-size: 1.2rem;
  color: var(--theme-text_1);
`;

export const TextError = styled(Text)`
  color: var(--theme-error);
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
  position: initial; /* so the before grows until <article> */
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
  return (
    <CardLinkWrapper>
      <CardLinkHeading>
        <Link href={href} passHref>
          <CardLinkTitle>{title}</CardLinkTitle>
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
  margin: 20px 0 0;
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

export function Case({ title, children, ...props }) {
  const { variant } = useContextExercise();

  return (
    <CaseBox {...props}>
      <CaseVariant>{variant}</CaseVariant>
      {title && <CaseTitle className="g-cardTitle">{title}</CaseTitle>}
      {children}
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
    <svg
      viewBox="0 0 94 83"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "none" }}
    >
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
      style={{ display: "none" }}
    >
      <path d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"></path>
    </svg>
  );
}

export function IconCart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
      width="1px"
      aria-hidden="true"
      style={{ display: "none" }}
    >
      <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
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

// =========

export const fadeIn = keyframes`
 0% { opacity: 0; }
 100% { opacity: 1; }
`;

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

  // 🍀 No-motion first approach
  // https://www.tatianamac.com/posts/prefers-reduced-motion/
  // By default do not animate stuff...
  animation: none;

  // ...unless the user clearly states not having a preferece
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

export const srOnlyStyles = css`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
  margin: -1px;
  padding: 0;
`;

export const SROnly = styled.span`
  ${srOnlyStyles}
`;
