import LinkNext from "next/link";
import styled, { css } from "styled-components";

/*
💡 [1] outline transparent ensures focus is visible in Windows
High Contrast as the box-shadow is ignored by default.
https://blogs.windows.com/msedgedev/2020/09/17/styling-for-windows-high-contrast-with-new-standards-for-forced-colors/
*/

export const buttonCSS = css`
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  border-radius: 12px;
  padding: 8px;
  border: none;
  border: 1px solid;
  border: 2px solid var(--theme-primary);
  background-color: var(--theme-primary);
  color: var(--theme-text_invert);
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1;
  margin-right: 8px;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: 1px solid transparent; /* [1] */
    box-shadow: var(--theme-focus_shadow);
  }

  /* remove outline in browsers that support :focus-visible */
  &:focus:not(:focus-visible) {
    outline: none;
    box-shadow: none;
  }

  &:focus-visible {
    outline: 1px solid transparent; /* [1] */
    box-shadow: var(--theme-focus_shadow);
  }
`;

export const buttonOutlineCSS = css`
  ${buttonCSS};
  color: var(--theme-text_0);
  border-color: currentColor;
  background-color: transparent;
`;

export const buttonToggleCSS = css`
  position: relative;
  display: inline-flex;
  gap: 4px;
  align-items: center;
  cursor: pointer;
  border-radius: 12px;
  padding: 8px 10px;
  border: none;
  border: 2px solid;
  background-color: transparent;
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 1;
  color: #333;

  &:hover {
    opacity: 0.7;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--theme-focus_shadow);
  }

  svg {
    width: 16px;
    height: 16px;
    fill: transparent;
    stroke: currentColor;

    &:not(:first-child) {
      margin-left: 4px;
    }
  }

  &[data-active="true"],
  &[aria-pressed="true"] {
    color: #c70000;
    animation: grow 250ms ease-out;

    svg {
      fill: currentColor;
    }
  }
`;

export const linkCSS = css`
  all: initial;
  --linkClr: var(--theme-primary);
  position: relative;
  display: inline-block;
  text-decoration: underline;
  text-decoration-color: var(--linkClr);
  color: inherit;
  z-index: 0;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;

  &:hover::before {
    transform: scale(1, 1);
  }

  &::before {
    content: "";
    position: absolute;
    bottom: 1px;
    left: -2px;
    width: calc(100% + 4px);
    height: 1.2em;
    background-color: var(--linkClr);
    border-radius: 3px;
    opacity: 0.2;
    transform: scale(1, 0.2);
    transform-origin: 0 97%;
    z-index: -1;
    transition: transform 175ms ease-out;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:focus-visible {
    border-radius: 4px;
    box-shadow: var(--theme-focus_shadow);
    outline: var(--theme-focus_outline);
  }

  &[target="_blank"] {
    cursor: alias;
  }
`;

export const Button = styled.button`
  ${buttonCSS}
`;

const Anchor = styled.a`
  ${linkCSS}
`;

export function Link({ href, children, ...props }) {
  return (
    <LinkNext href={href} passHref>
      <Anchor {...props}>{children}</Anchor>
    </LinkNext>
  );
}
