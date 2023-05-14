import styled from "styled-components";

export const Tooltip = styled.div`
  position: relative;
  display: inline-block;
`;

export const TooltipBox = styled.div`
  position: absolute;
  width: 150px;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding-bottom: 8px; /* use padding to preserve hover when moving cursor between the tooltip button and the tooltipItself */

  opacity: 0;
  visibility: hidden;

  /* delay 250ms to give time to fade out */
  transition: opacity 250ms, visibility 1ms 250ms;

  ${Tooltip}:hover &,
  ${Tooltip}:focus-within & {
    opacity: 1;
    visibility: visible;
    transition: opacity 250ms;
  }

  ${Tooltip}:hover & {
    /* delay fadein 500ms to prevent accidental hovers */
    transition: opacity 250ms 500ms;
  }
`;

export const TooltipItself = styled.div`
  --bg: var(--theme-text_0);
  color: var(--theme-text_invert);
  font-size: 1.5rem;
  position: relative;
  display: block;
  background: var(--bg);
  padding: 6px 8px;
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
