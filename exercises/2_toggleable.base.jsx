import { css } from "styled-components";

export const refs = {
  toggleStates: [
    {
      name: "Rules of ARIA",
      url: "https://w3c.github.io/using-aria/#notes2",
    },
    {
      name: "Name, Role, Value",
      url: "https://www.w3.org/WAI/WCAG22/quickref/?showtechniques=412#name-role-value",
    },
    {
      name: "Playing with state",
      url: "https://sarahmhigley.com/writing/playing-with-state/",
    },
  ],
  hiding: [
    {
      name: "Hiding content responsibly",
      url: "https://kittygiraudel.com/2021/02/17/hiding-content-responsibly/",
    },
    {
      name: "The inert attribute",
      url: "https://developer.chrome.com/articles/inert/",
    },
  ],
  detailsEl: [
    {
      name: "Animating Details",
      url: "https://css-tricks.com/exploring-what-the-details-and-summary-elements-can-do/",
    },
    {
      name: "Details are not accordions/menus/etc",
      url: "https://adrianroselli.com/2019/04/details-summary-are-not-insert-control-here.html",
    },
  ],
};

export const actionsContainerCSS = css`
  position: relative;
  width: min-content;
  margin-bottom: 8px;
  --val: calc(100% + 2px); /*2px for focus shadow space */
`;

export const actionsUlCSS = css`
  margin: 0;
  padding: 0;
  list-style: none;
  gap: 4px;
  display: flex;
`;

export function ActionsItems() {
  return (
    <ul css={actionsUlCSS}>
      <li>
        <button onClick={() => alert("Imagine Copy")}>Copy</button>
      </li>
      <li>
        <button onClick={() => alert("Imagine Cut")}>Cut</button>
      </li>
      <li>
        <button onClick={() => alert("Imagine Edit")}>Edit</button>
      </li>
    </ul>
  );
}
