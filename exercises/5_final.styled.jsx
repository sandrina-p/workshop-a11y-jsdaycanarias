import { css } from "styled-components";

/* 💡 You can ignore all this CSS, 
it's out-of-scope for this exercise. */

export const header = css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const headerTag = css`
  order: -1;
  margin: 0;
`;

export const cartBtn = css`
  all: unset;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #aaa;
  padding: 2px 4px;
  border-radius: 4px;
  cursor: pointer;

  svg {
    width: 24px;
    fill: currentColor;
  }

  &:hover {
    color: var(--theme-primary);
  }

  &:focus {
    box-shadow: var(--theme-focus_shadow);
  }
`;

export const plantName = css`
  font-weight: 600;
  text-align: left;
  margin: 0 0 16px;
  font-size: 3.2rem;
  line-height: 1.2;
  margin-bottom: 16px;

  &:focus {
    outline: none;
  }
`;

export const tagSecondary = css`
  padding: 2px 4px;
  text-transform: uppercase;
  font-size: 1.4rem;
  font-weight: 600;
  background-color: #ffe6d2;
  color: #a75000;
  line-height: 1;
`;

/* ------- Info -------  */

export const info = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0;
`;

export const infoPart = css`
  flex: 1;
`;

export const topic = css`
  margin: 0;
  padding: 0;

  li {
    display: flex;
    flex-direction: column;
    margin: 0 0 16px;
    padding: 0;
  }
`;

export const topicKey = css`
  font-size: 1.4rem;
  color: var(--theme-text_1);
`;

export const topicValue = css`
  font-size: 2.1rem;
  font-weight: 600;
  line-height: 1.2;
  margin: 0;
`;

export const media = css`
  flex-basis: 50%;
  flex-shrink: 0;
`;

export const mediaImg = css`
  max-width: 100%;
`;

/* ------- Details & CTA -------  */

export const details = css`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
  margin-top: 5rem;
  min-height: 30rem;
`;

export const placeholder = css`
  background: #eee;
  height: 100%;
  border-radius: 4px;
  height: 20rem;
  flex-grow: 1;
  padding: 8px;
`;

export const price = css`
  line-height: 1;
`;

export const priceOriginal = css`
  text-decoration: line-through;
  opacity: 0.7;
  margin: 0 0 4px;
`;

export const priceFinal = css`
  font-size: 2.4rem;
  font-weight: 600;
  line-height: 1.2;
  margin: 0;
`;

export const btnCta = css`
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
  font-weight: 600;
  min-width: 170px;
  background-color: var(--theme-primary);
  color: #fff;
  overflow: hidden;

  &:hover:not([aria-disabled="true"], [disabled]) {
    filter: brightness(1.3);
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:focus-visible {
    box-shadow: var(--theme-focus_shadow);
    outline: var(--theme-focus_outline);
  }

  &[aria-disabled="true"],
  &[disabled] {
    background: #ccc;
    cursor: not-allowed;
  }
`;

/* ------- Tabs -------  */

export const tabs = css`
  [data-css-tab-list],
  [data-reach-tab-list] {
    border-bottom: 1px solid var(--theme-primary);
    border-bottom: 1px solid #aaa;

    display: flex;
    gap: 12px;

    &:focus-within {
      border-bottom: 1px solid var(--theme-secondary);
    }
  }

  [data-css-tab-btn],
  [data-reach-tab] {
    all: unset;
    padding: 6px 2px;
    border-bottom: 3px solid transparent;
    font-weight: 500;

    &:hover,
    &:focus {
      border-bottom-color: var(--theme-text_0);
    }

    &:focus-visible {
      outline: 2px solid var(--theme-secondary);
    }

    &[aria-current="true"],
    &[data-selected] {
      border-bottom-color: var(--theme-primary);
    }
  }

  [data-css-tab-panels],
  [data-reach-tab-panels] {
    padding: 10px 0;
  }

  [data-css-tab-panels] {
    position: relative;
    height: 25rem; /* forced height. */
  }

  [data-css-tab-panel] {
    position: absolute;
    width: 100%;
    top: 10px;
    opacity: 0;
    transition: opacity 100ms;

    &[aria-current="true"] {
      opacity: 1;
    }
  }
`;

/* ------- Back to top -------  */

export const btnTop = css`
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

/* ------- Breadcrumbs -------  */

export const breadcrumbs = css`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 6px;
  color: #aaa;
  font-size: 1.3rem;

  li:not(:last-child) {
    &::after {
      margin-left: 6px;
      content: ">" / "";
      font-weight: 600;
    }
  }

  a {
    color: inherit;
    text-decoration-color: currentcolor;

    &:focus:not(:focus-visible) {
      outline: none;
    }

    &:focus-visible {
      box-shadow: var(--theme-focus_shadow);
      outline: var(--theme-focus_outline);
    }
  }
`;

export const breadcrumbsCurrent = css`
  font-weight: 500;
`;

/* ------- Others -------  */

/* Screen Reader Only
  https://kittygiraudel.com/2021/02/17/hiding-content-responsibly/
*/
export const srOnly = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

//  const animPressed = keyframes`
//   0%,
//   100% {
//     transform: scale(1);
//   }
//   30% {
//     transform: scale(0.9);
//   }
// `;
