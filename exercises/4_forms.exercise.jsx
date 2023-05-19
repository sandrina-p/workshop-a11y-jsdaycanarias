import React from "react";

import { buttonOutlineCSS } from "../src/components/Button";
import { fieldCSS } from "../src/components/Form";
import { Case, Stack } from "../src/components/Layout";
import { mailPattern } from "../src/utils";

function CaseInputInformation() {
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

export const cases = [
  {
    id: "field",
    Exercise: CaseInputInformation,
    briefing: ``,
    resources: [
      {
        name: "Guide: Accessible form validations",
        url: "https://www.smashingmagazine.com/2023/02/guide-accessible-form-validation/#wrapping-up",
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
    briefing_bonus: ``,
  },
];
