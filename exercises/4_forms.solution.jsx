import React from "react";

import { buttonOutlineCSS } from "../src/components/Button";
import { fieldCSS } from "../src/components/Form";
import { Case, Stack } from "../src/components/Layout";
import { mailPattern } from "../src/utils";

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
    <Case title="Input information">
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
        <button onClick={() => setFormErrors({})} css={buttonOutlineCSS}>
          Reset error
        </button>
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

export const solutions = [
  {
    Solution: CaseInputInformationSolution,
    explanation: ``,
  },
];
