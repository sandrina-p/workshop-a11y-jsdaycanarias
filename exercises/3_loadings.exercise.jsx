import React from "react";
import { css } from "styled-components";

import { buttonCSS, buttonOutlineCSS } from "../src/components/Button";
import { Case, Loader } from "../src/components/Layout";
import { fetchFakeLottery } from "../src/utils";

function CaseLoadingState() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [result, setResult] = React.useState({});

  async function loadLottery() {
    setIsLoading(true);
    setError(null);
    if (isLoading) {
      return;
    }

    try {
      const { type, msg } = await fetchFakeLottery(2000);
      setResult({ type, msg });
    } catch (error) {
      setResult({});
      setError(error.message);
    }
    setIsLoading(false);
  }

  function handleReset() {
    setResult({});
    setError(null);
  }

  const isEmptyState = !result.msg && !error && !isLoading;

  return (
    <Case title="Loading states">
      <div>
        <button onClick={loadLottery} css={buttonCSS}>
          Get lottery
        </button>
        <button onClick={handleReset} css={buttonOutlineCSS}>
          Reset
        </button>
        <div css={resultsCSS}>
          {isEmptyState && <div css={feedbackEmpty}>Try your luck!</div>}

          {isLoading && <Loader />}

          {result.msg && !isLoading && (
            <div css={feedbackInfo}>{result.msg}</div>
          )}

          {error && <p css={feedbackError}>{error}</p>}
        </div>
      </div>
    </Case>
  );
}

// ========================
// You can ignore this part
// ========================

export const cases = [
  {
    id: "loading",
    Exercise: CaseLoadingState,
    briefing: ``,
    resources: [
      {
        name: "Using aria-live",
        url: "https://bitsofco.de/using-aria-live/",
      },
      {
        name: "Accessible Skeletons",
        url: "https://adrianroselli.com/2020/11/more-accessible-skeletons.html",
      },
      {
        name: "Dynamic search & results",
        url: "https://www.scottohara.me/blog/2022/02/05/dynamic-results.html",
      },
    ],
    briefing_bonus: ``,
  },
];

// =============

var feedbackError = css`
  border-radius: 4px;
  border: 1px solid var(--theme-error);
  padding: 8px;
  background-color: #ff000026;
`;

var feedbackInfo = css`
  ${feedbackError}
  border-color: #808080;
  background-color: #a9a9a926;
`;

var feedbackEmpty = css`
  ${feedbackError}
  border-color: #808080;
  border: 1px dashed;
  background-color: transparent;
`;

var resultsCSS = css`
  margin-top: 16px;
  min-height: 45px;
`;
