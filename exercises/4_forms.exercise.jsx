import React from "react";
import { css } from "styled-components";

import { buttonOutlineCSS } from "../src/components/Button";
import { customCheckboxCSS, fieldCSS } from "../src/components/Form";
import { Case, Stack } from "../src/components/Layout";
import { mailPattern } from "../src/utils";

const fieldRadio = css`
  input {
    /* 💡 We shouldn't use display:none, right? */
    display: none;
  }

  ${customCheckboxCSS}
`;

function CaseInputInformation() {
  const [formErrors, setFormErrors] = React.useState({});
  const [formTouch, setFormTouch] = React.useState({});

  function handleEmailBlur(e) {
    setFormTouch((prev) => ({ ...prev, email: true }));

    const emailError = emailValidation(e.target.value);
    console.log(emailError);
    setFormErrors((prev) => ({ ...prev, email: emailError }));
  }

  function handleEmailChange(e) {
    if (formTouch.email && e.target.value.match(mailPattern)) {
      setFormErrors({ email: null });
    }
  }

  return (
    <Case
      title="Input information"
      // 💡 A11Y myth: Blind people are not the only ones who use SRs
      // style={{ filter: "blur(4px)" }}
    >
      <form>
        <div css={fieldCSS.field}>
          <label css={fieldCSS.label} htmlFor="emailSolution">
            Your e-mail <span css={fieldCSS.star}>*</span>
          </label>
          <input
            // 💡 Add the needed field info
            // - the type for keyboard layout (type)
            // - if it is required or not (aria-required)
            // - if it is valid or not (aria-invalid)
            // - the description (aria-describedby)
            onBlur={handleEmailBlur}
            onChange={handleEmailChange}
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
        </div>

        {/* Group checkbox
        💡 Checkboxes/radios must be wrapped
        in a <fieldset> and use <legend> to mark their common label
        */}
        <div css={fieldCSS.field}>
          <p css={fieldCSS.label}>Account</p>
          <label css={fieldRadio}>
            <input type="radio" name="account" value="basic" />
            <span>Basic</span>
          </label>
          <label css={fieldRadio}>
            <input type="radio" name="account" value="premium" />
            <span>Premium</span>
          </label>
        </div>
      </form>

      <Stack justifyContent="flex-end">
        <button onClick={() => setFormErrors({})} css={buttonOutlineCSS}>
          Reset error
        </button>
      </Stack>
    </Case>
  );
}

function emailValidation(value) {
  if (!value) {
    return "The email is required.";
  }
  if (!value.match(mailPattern)) {
    return "The e-mail is not valid.";
  }
  return null;
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

export const cases = [
  {
    id: "field",
    Exercise: CaseInputInformation,
    briefing: `
Form fields need more than labels. Remember the other three states: required, error and descriptions.

Did you know that SR users usually [prefer to fill forms using the \`Tab\` key](https://twitter.com/a_sandrina_p/status/1382811701796614148),
but can't because we, developers, failed to build them with A11Y in mind?

---
Go fix the A11Y issues of each field. You may explore the Accessibility Tree tab on DevTools to know how the field is announced.
    `,
    resources: [
      {
        name: "Guide: Accessible form validations",
        url: "https://www.smashingmagazine.com/2023/02/guide-accessible-form-validation/#wrapping-up",
      },
      {
        name: "Accessibility Tree in Chrome DevTools",
        url: "https://developer.chrome.com/blog/full-accessibility-tree/",
      },
      {
        name: "Note about aria-label usage",

        url: "https://www.tpgi.com/short-note-on-aria-label-aria-labelledby-and-aria-describedby/",
      },
      {
        name: "Example of a error summary",
        extra: true,
        url: "https://www.a11yproject.com/contact/",
      },
    ],
    // briefing_bonus: ``,
  },
];
