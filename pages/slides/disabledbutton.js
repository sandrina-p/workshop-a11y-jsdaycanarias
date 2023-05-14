import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled, { keyframes } from "styled-components";

const keyFramesGrow = keyframes`
  0%,
  100% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.2);
  }
`;

const Container = styled.div`
  /* Dark theme */
  --theme-text_0: #e2e2e2;
  --theme-text_invert: #343434;
  --theme-bg_0: #3a383b;
  --theme-bg_1: #2e2a2f;
  --theme-primary: hsl(180deg 100% 45%);
  --theme-primary_smooth: hsl(180deg 100% 19%);
  --theme-error: #ff9d9d;
  --theme-focus_shadow: var(--theme-bg_0) 0 0 0 2px,
    var(--theme-secondary) 0 0 0 4px;

  background: var(--theme-bg_0);
  padding: 10px 10px 40px;
  text-align: left !important;

  .btnStyleCtlr {
    font-size: 1rem;
    margin-left: 20px; /* don't judge my css skills, okay? */
  }

  svg {
    display: inline;
    width: 11px;
  }
`;

const Playground = styled.div`
  height: 30px;
  padding-top: 50px;
  padding-left: 10px;
`;

const Button = styled.button`
  --btnTxt: #fff;
  position: relative;
  display: inline-block;
  cursor: pointer;
  min-height: 38px;
  padding: 2px 20px;
  background-color: var(--theme-primary);
  border-radius: 4px;
  border: none;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--btnTxt);
  text-align: center;

  &:hover:not([aria-disabled="true"]) {
    filter: brightness(1.2);
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--theme-focus_shadow);
  }

  &[disabled],
  &[aria-disabled="true"] {
    cursor: not-allowed;
    background: #82b8b8; // primary-weak
    color: var(--theme-text_invert);
  }
`;

const TooltipArea = styled.div`
  position: relative;
`;

const TooltipBox = styled.div`
  position: absolute;
  width: 120px;
  bottom: 100%;
  left: -3px;
  padding-bottom: 8px; /* use padding to preserve hover when moving cursor between the tooltip button and the tooltipItself */

  opacity: 0;
  visibility: hidden;

  /* delay 250ms to give time to fade out */
  transition: opacity 250ms, visibility 1ms 250ms;

  ${TooltipArea}:hover &,
  ${TooltipArea}:focus-within & {
    opacity: 1;
    visibility: visible;
    transition: opacity 250ms;
  }

  ${TooltipArea}:hover & {
    /* delay fadein 500ms to prevent accidental hovers */
    transition: opacity 250ms 500ms;
  }
`;

const TooltipItself = styled.div`
  --bg: white;
  position: relative;
  display: block;
  background: var(--bg);
  color: var(--theme-text-1);
  padding: 6px 8px;
  font-size: 1rem;
  border-radius: 4px;
  text-align: center;
  -webkit-font-smoothing: initial;
  -moz-osx-font-smoothing: initial;

  &::after {
    width: 10px;
    height: 10px;
    content: "";
    display: block;
    position: absolute;
    bottom: -4px;
    left: calc(50% - 5px);
    background: var(--bg);
    transform: rotate(45deg);
  }
`;

export default function Page() {
  return (
    <Container
      style={{
        textAlign: "center",
        transform: "scale(2)",
        transformOrigin: "0 0",
      }}
    >
      <style jsx global>{`
        body {
          overflow: hidden; /* for iframe in slides */
          background: #3a383b; /* dark -> bg_0 */
        }
      `}</style>
      <Playground>
        <TooltipArea>
          <Button disabled="disabled" aria-describedby="disabledReason">
            Buy ticket
          </Button>
          <TooltipBox role="tooltip" id="disabledReason">
            <TooltipItself>Tickets are sold out.</TooltipItself>
          </TooltipBox>
        </TooltipArea>

        <br />
        <br />
        <br />

        <TooltipArea>
          <Button aria-disabled="true" aria-describedby="disabledReason">
            Buy ticket
          </Button>
          <TooltipBox role="tooltip" id="disabledReason">
            <TooltipItself>Tickets are sold out.</TooltipItself>
          </TooltipBox>
        </TooltipArea>
      </Playground>
    </Container>
  );
}
