import { css } from "styled-components";

import imgCatRest from "../../public/imgs/cat_rest.jpg";
import imgCatSearching from "../../public/imgs/cat_searching.jpg";
import imgCatStairing from "../../public/imgs/cat_stairing.jpg";

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
