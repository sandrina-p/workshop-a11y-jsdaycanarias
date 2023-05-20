import { css } from "styled-components";

export const fieldCSS = {
  field: css`
    margin: 16px 0;

    fieldset& {
      /* exercise_4 */
      border: none;
      padding: 0;
    }
  `,
  star: css`
    color: var(--theme-error);
    vertical-align: super;
    font-size: 0.7em;
  `,
  label: css`
    display: block;
    padding-bottom: 2px;
    font-weight: 600;
  `,
  input: css`
    border-radius: 6px;
    border: 1px solid var(--theme-text_1);
    height: 26px;
    padding: 8px;
  `,
  hint: css`
    color: var(--theme-text_1);
    font-size: 0.9em;
  `,
  error: css`
    color: var(--theme-error);
    font-size: 0.9em;
  `,
};

export const customCheckboxCSS = css`
  position: relative;
  display: block;

  &:hover + :last-child::before {
    border-color: #6f6f6f;
  }

  input:focus + :last-child::before {
    border-color: #8c00ff;
    box-shadow: var(--theme-focus_shadow);
    outline: var(--theme-focus_outline);
  }

  &:last-child::before,
  &:last-child::after {
    display: inline-block;
    border-radius: 2px;
  }

  & :last-child::before {
    content: "";
    display: inline-block;
    width: 14px;
    height: 14px;
    margin-right: 5px;
    border-radius: 50%;
    border: 1px solid #6f6f6f;
    transform: translateY(2px);
    transition: box-shadow 150ms, background-color 150ms;
  }

  & :last-child::after {
    font-family: sans-serif;
    content: "";
    line-height: 1;
    font-size: 14px;
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    top: 12px;
    left: 8px;
    background-color: #fff;
    transform: translate(-50%, -50%);
  }

  input:checked + :last-child::before {
    border-color: #8c00ff;
    background-color: #8c00ff;
  }
`;

export function FormSample() {
  return (
    <form>
      <div css={fieldCSS.field}>
        <label htmlFor="name" css={fieldCSS.label}>
          Your name
        </label>
        <input id="name" type="text" css={fieldCSS.input} />
      </div>
    </form>
  );
}
