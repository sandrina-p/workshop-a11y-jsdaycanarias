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
          {/* 💡 1/3 Always connect the label to the input */}
          <label css={fieldCSS.label} htmlFor="emailSolution">
            Your e-mail {/* 💡 2/3 Hide this visual indicator from AT. */}
            <span aria-hidden="true" css={fieldCSS.star}>
              *
            </span>
          </label>
          <input
            // 💡 2/3 Add the necessary field state info
            type="email" // keyboard layout
            id="emailSolution" // label connector
            aria-required="true" // semantic required
            aria-invalid={formErrors.email} // validation status
            aria-describedby="emailErrorSolution emailHintSolution" // full description
            onBlur={handleEmailBlur}
            onChange={handleEmailChange}
            css={fieldCSS.input}
          />
          <p>
            {formErrors.email && (
              <span
                id="emailErrorSolution"
                // 💡 2/3 We can use aria-live if it's only on blur
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

        {/* Group checkbox
        💡 3/3 Checkboxes/radios must be wrapped
        in a <fieldset> and use <legend> to mark their common label
        */}
        <fieldset css={fieldCSS.field}>
          <legend css={fieldCSS.label}>Account</legend>
          <label css={fieldRadio}>
            <input type="radio" name="account" value="basic" />
            <span>Basic</span>
          </label>
          <label css={fieldRadio}>
            <input type="radio" name="account" value="premium" />
            <span>Premium</span>
          </label>
        </fieldset>
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

export const solutions = [
  {
    Solution: CaseInputInformation,
    explanation: `
Add the needed aria-* attributes to make a field fully accessible:
- Text field:
  - \`aria-required\`: To mark a field as required,
    - The * (star): Hide it from screen readers to not say "asterisk"
  - \`aria-invalid\`: Be explicit when a given field is invalid
  - \`aria-describedby\`: Pass the id of the description and error.
  - \`aria-live\`: With "assertive" to announce the error immediately.
- Checkbox:
  - Use \`fieldset\` and \`legend\` so the SR can read both 
  the parent label and the checkbox label.
  `,
  },
];
