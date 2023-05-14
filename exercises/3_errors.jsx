import React from "react";
import { css } from "styled-components";

import { buttonCSS, buttonOutlineCSS } from "../components/Button";
import { fieldCSS } from "../components/Form";
import { Case, Loader, Stack } from "../components/Layout";
import { useContextExercise } from "../components/pageLayouts/LayoutExercise";
import { fetchFakeLottery, mailPattern } from "../utils";

function Exercise() {
  return (
    <>
      <CaseLoadingStateExercise />
      <CaseInputInformationExercise />
    </>
  );
}

function CaseLoadingStateExercise() {
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
    <Case title="Loading states" refs={refs.loadingState}>
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

function CaseInputInformationExercise() {
  const [formErrors, setFormErrors] = React.useState({});

  function handleInputBlur(e) {
    if (!e.target.value.match(mailPattern)) {
      setFormErrors({ email: "The e-mail is not valid." });
    }
  }

  function handleInputChange(e) {
    if (formErrors.email && e.target.value.match(mailPattern)) {
      setFormErrors({ email: undefined });
    }
  }

  return (
    <Case title="Input information" refs={refs.inputDetails}>
      <form>
        <label css={fieldCSS.field}>
          <span css={fieldCSS.label}>Your e-mail</span>
          <input
            onBlur={handleInputBlur}
            onChange={handleInputChange}
            css={fieldCSS.input}
          />
          <p>
            {formErrors.email && (
              <span id="emailError" css={fieldCSS.error}>
                {formErrors.email}
              </span>
            )}{" "}
            <span css={fieldCSS.hint}>We promise to not spam you.</span>
          </p>
        </label>
      </form>

      <Stack justifyContent="flex-end">
        <button onClick={() => setFormErrors({})}>Reset error</button>
      </Stack>
    </Case>
  );
}

/*

*
*
*
*
*
*
*
*
*
*

🚨   SPOILERS AHEAD   🚨

🛑 DO NOT SCROLL MORE 🛑 

🙈   SOLUTION BELOW   🙈


*
*
*
*
*
*
*
*
*
*

*/

function Solution() {
  return (
    <>
      <CaseLoadingStateSolution />

      <CaseInputInformationSolution />
    </>
  );
}

function CaseLoadingStateSolution() {
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
    <Case title="Loading states" refs={refs.loadingState}>
      <div>
        <button onClick={loadLottery} css={buttonCSS}>
          Get lottery
        </button>
        <button onClick={handleReset} css={buttonOutlineCSS}>
          Reset
        </button>
        <div css={resultsCSS}>
          {isEmptyState && <div css={feedbackEmpty}>Try your luck!</div>}

          {/* 💡 Use aria-live to announce dynamic content inserted in the page. */}
          {isLoading && (
            <Loader aria-live="assertive" aria-label="Loading..." />
          )}

          {/* 💡 In results with a lot of content, do not use aria-live.
           Instead, use aria-live in a hidden element with just a summary 
           eg "Total of 5 results loaded". */}
          {result.msg && !isLoading && (
            <div aria-live="assertive" css={feedbackInfo}>
              {result.msg}
            </div>
          )}

          {error && (
            <p aria-live="assertive" css={feedbackError}>
              {error}
            </p>
          )}
        </div>
      </div>
    </Case>
  );
}

// =============

function CaseInputInformationSolution() {
  const [formErrors, setFormErrors] = React.useState({});

  function handleInputBlur(e) {
    if (!e.target.value.match(mailPattern)) {
      setFormErrors({ email: "The e-mail is not valid." });
    }
  }

  function handleInputChange(e) {
    if (formErrors.email && e.target.value.match(mailPattern)) {
      setFormErrors({ email: undefined });
    }
  }

  return (
    <Case title="Input information" refs={refs.inputDetails}>
      <form>
        <div css={fieldCSS.field}>
          {/* // 💡 Always add a name (eg label) to an input */}
          <label css={fieldCSS.label} htmlFor="emailSolution">
            Your e-mail <span aria-hidden="true">*</span>
          </label>
          <input
            // 💡 Add the necessary field state info
            type="email" // keyboard layout
            id="emailSolution" // label connector
            aria-required="true" // semantic required
            aria-invalid={formErrors.email} // validation status
            aria-describedby="emailErrorSolution emailHintSolution" // full description
            onBlur={handleInputBlur}
            onChange={handleInputChange}
            css={fieldCSS.input}
          />
          <p>
            {formErrors.email && (
              <span
                id="emailErrorSolution"
                // 💡 We can use aria-live if it's only on blur
                // Me mindful to not be annoying with too many announcements
                aria-live="assertive"
                css={fieldCSS.error}
              >
                {formErrors.email}
              </span>
            )}{" "}
            <span id="emailHintSolution" css={fieldCSS.hint}>
              We promise to not spam you.
            </span>
          </p>
        </div>
      </form>

      <Stack justifyContent="flex-end">
        <button onClick={() => setFormErrors({})}>Reset error</button>
      </Stack>
    </Case>
  );
}

// =============
// =============
// =============
// =============

// Unrelevant boilerplate code / data / css for this exercise

export default function Page() {
  const { variant } = useContextExercise();
  return variant === "exercise" ? <Exercise /> : <Solution />;
}

// ===============

var refs = {
  loadingState: [
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
  inputDetails: [
    {
      name: "Accessible forms",
      url: "https://webaim.org/techniques/forms/",
    },
    {
      name: "Note on aria-label",
      url: "https://www.tpgi.com/short-note-on-aria-label-aria-labelledby-and-aria-describedby/",
    },
    {
      name: "Form global error example",
      url: "https://www.a11yproject.com/contact/",
    },
  ],
};

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
