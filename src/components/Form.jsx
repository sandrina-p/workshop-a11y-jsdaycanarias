import { css } from "styled-components";

export const fieldCSS = {
  field: css`
    margin: 16px 0;
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
