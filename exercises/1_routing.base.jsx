import { css } from "styled-components";

import imgCatRest from "../public/imgs/cat_rest.jpg";
import imgCatSearching from "../public/imgs/cat_searching.jpg";
import imgCatStairing from "../public/imgs/cat_stairing.jpg";

export const refs = {
  btnVsLink: [
    {
      name: "Buttons vs Links",
      url: "https://css-tricks.com/a-complete-guide-to-links-and-buttons/",
    },
    {
      name: "Accessible client routing",
      url: "https://www.gatsbyjs.com/blog/2019-07-11-user-testing-accessible-client-routing/",
    },
  ],
  btnAreLinks: [
    {
      name: "Go back as Link",
      url: "https://stackoverflow.com/questions/72676015/react-router-go-back-using-link",
    },
    {
      name: "Creating good focus indicators",
      url: "https://www.sarasoueidan.com/blog/focus-indicators/",
    },
  ],
};

export const dataCats = [
  {
    url: imgCatRest,
    name: "Tokio",
  },
  {
    url: imgCatSearching,
    name: "Oscar",
  },
  {
    url: imgCatStairing,
    name: "Luna",
  },
];

export const cssListCats = {
  ul: css`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    gap: 24px;

    li {
      flex-basis: 33%;
    }
  `,
  info: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `,
};
