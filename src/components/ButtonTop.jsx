import { css } from "styled-components";

import { IconArrowTop, SROnly } from "./Layout";

const btnTop = css`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  font-size: 1.6rem;
  border: none;
  padding: 8px 24px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  text-decoration: none;
  background-color: var(--theme-primary);
  color: var(--theme-bg_0);
  width: 44px;
  padding: 0;
  border-radius: 50%;

  svg {
    width: 16px;
    fill: currentColor;
  }

  &:hover {
    filter: brightness(1.3);
  }

  &:focus {
    box-shadow: var(--theme-focus_shadow);
    outline: var(--theme-focus_outline);
  }
`;

export function ButtonTop(props) {
  return (
    <button css={btnTop} {...props}>
      <IconArrowTop />
      <SROnly>Back to top</SROnly>
    </button>
  );
}
