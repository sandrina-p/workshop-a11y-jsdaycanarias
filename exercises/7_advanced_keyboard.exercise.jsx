import React from "react";
import { css } from "styled-components";

import { buttonOutlineCSS } from "../src/components/Button";
import { Case, Stack } from "../src/components/Layout";
import { people } from "../src/utils/people.js";

function CaseRoving() {
  return (
    <Case title="Roving technique">
      <h3>Create "Checkout" Team</h3>

      <p>
        Here's a <a href="#">link</a> just for example.
      </p>

      <table css={stylesTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Job Role</th>
            <th>City</th>
            <th>
              <span className="sr-only">Select</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {people.map((p) => {
            return (
              <tr key={p.userId}>
                <td>
                  <a
                    //
                    href={`#${p.userId}`}
                  >
                    {p.name}
                  </a>
                </td>
                <td>{p.jobRole}</td>
                <td>
                  <a
                    //
                    href={p.cityUrl}
                  >
                    {p.city}
                  </a>
                </td>
                <td>
                  <input
                    type="checkbox"
                    name="people"
                    value={p.userId}
                    aria-label="Promote"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Stack justifyContent="end">
        <button css={buttonOutlineCSS}>Next step</button>
      </Stack>
    </Case>
  );
}

// ========================
// You can ignore this part
// ========================

// *
// *
// *
// *
// *
// *
// *
// *
// *
// *
// *

export const stylesTable = css`
  border: 1px solid;
  border-collapse: collapse;
  width: 100%;
  margin: 16px 0;

  th {
    padding: 4px 8px;
    text-align: left;
    background: var(--theme-text_0);
    color: var(--theme-text_invert);
  }

  td {
    padding: 4px 8px;
    border-bottom: 1px solid;
  }

  tr:nth-child(even) {
    background: #eee;
  }

  tr:focus-within {
    background: #cdcdff;
    outline: 2px solid #3f51b5;
  }

  th:last-child,
  td:last-child {
    width: 50px;
  }
`;

export const cases = [
  {
    id: "roving",
    Exercise: CaseRoving,
    briefing: `
Nagivating this table demands a lot of Tab, Tab Tab. 
Can we make it better? Yes, with the "Roving Tabindex" technique.   

"Roving tabindex" is a strategy to maximize the UX efficiency as much
as possible when navigating a complex app with a keyboard.

With "Roving" you treat complex components as a Single Tab stop, so
the user can quickly bypass it by pressing Tab again. To navigate 
within the complex component, they'll use other keys, for instance, the Arrow keys.

This technique is common in Menus, Tabs, and even long Nav bars. 
        `,
    resources: [
      {
        name: "Video: Roving tabindex",
        url: "https://www.youtube.com/watch?v=uCIC2LNt0bk",
      },
      {
        name: "Demo: Toolbar by WAI",
        url: "https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/",
      },
      {
        name: "Roving in React",
        url: "https://www.joshuawootonn.com/react-roving-tabindex",
      },
    ],
  },
];
