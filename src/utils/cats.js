import { css } from "styled-components";

import imgCatCouch from "../../public/imgs/cat_couch.jpeg";
import imgCatDarkBg from "../../public/imgs/cat_dark_bg.png";
import imgCatRest from "../../public/imgs/cat_rest.jpg";
import imgCatSearching from "../../public/imgs/cat_searching.jpg";
import imgCatStairing from "../../public/imgs/cat_stairing.jpg";
import imgCatYoung from "../../public/imgs/cat_young.jpeg";

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
  {
    url: imgCatYoung,
    name: "Junior",
  },
  {
    url: imgCatDarkBg,
    name: "Milo",
  },
  {
    url: imgCatCouch,
    name: "Chloe",
  },
];

export const cssListCats = {
  title: css`
    text-align: center;
    margin-bottom: 16px;
  `,
  ul: css`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;

    li {
      flex-basis: 33%;
      margin-bottom: 16px;
    }
  `,
  info: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `,
};
