import React from "react";
import { css } from "styled-components";

import { buttonCSS, linkCSS } from "../src/components/Button";
import { Case, TextError } from "../src/components/Layout";
import { Tooltip } from "../src/components/Tooltip";
import { fetchProducts } from "../src/utils";

function Exercise() {
  const [page, setPage] = React.useState(null);
  const [products, setProcuts] = React.useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = React.useState(false);
  const [productsError, setProductsError] = React.useState(null);

  const isFormValid = page >= 1 && page <= 9;
  const isProductsOkay = !productsError && !isLoadingProducts;
  const isFormSubmitActive = isFormValid && !isLoadingProducts;

  async function handleSubmit(e) {
    e.preventDefault(); // avoid native form submit (page refresh)

    setIsLoadingProducts(true);
    setProductsError(null);

    try {
      const productsList = await fetchProducts(page);
      setProcuts(productsList);
    } catch (err) {
      // 🍀 Type "7" in the input to force an error.
      const errorMessage = `Ups, something went wrong.`;
      setProductsError(errorMessage);
    } finally {
      setIsLoadingProducts(false);
    }
  }

  return (
    <Case title="Loading states">
      {/* 🍀 All is good in this form. Jump to the results area */}
      <form noValidate onSubmit={handleSubmit} css={formCss.form}>
        <div>
          <FieldPages
            value={page}
            onChange={(e) => setPage(Number(e.target.value))}
          />
        </div>

        <Tooltip
          {...(isFormSubmitActive && { open: false })}
          Trigger={
            <button
              type="submit"
              css={buttonCSS}
              disabled={!isFormSubmitActive}
            >
              Get products
            </button>
          }
          content="Choose from page 1 to 9"
        />
      </form>

      {/* 💡 All changes will be done inside this div 
        Below it's the multiple dynamic states.
        Create the necessary live regions to ensure the
        dynamic content is announced by assistive technologies. */}
      <div css={formCss.resultsArea}>
        {/* Empty State */}
        {products.length === 0 && isProductsOkay && <p>No products yet.</p>}

        {/* Loading state */}
        {isLoadingProducts && <p>Loading products...</p>}

        {/* Error state */}
        {productsError && <TextError>{productsError}</TextError>}

        {/* Products list */}
        {products.length > 0 && isProductsOkay && (
          <div>
            <ul>
              {products.map((product) => (
                <li key={product.id}>Product {product.id}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <p>
        A <a href="#fake-link">dummy link</a> for demo purposes.
      </p>
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

export const cases = [
  {
    id: "loading",
    Exercise: Exercise,
    briefing: `
Imagine a page without loading states. 

It feels broken, right?
That's what people with visual impairements will face when we forget about accessibility in dynamic content.

In this exercise, let's improve the loading state and 
results accessible using Live Regions.
    `,
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
    briefing_bonus: `
Do you see that disabled button? 

When hovering it, a tooltip is shown.
Now, try to do the same using the keyboard...

You can't because the button has the \`disabled\` attr which
prevents any type of interaction, including focus.

Let's [make the disabled button more inclusive](https://css-tricks.com/making-disabled-buttons-more-inclusive/), by
replacing the \`disabled\` with \`aria-disabled="true"\`.

This ARIA attribute also marks the button as semantically disabled, but it does not change its behavior.
In other words, you can still focus it using the keyboard. 
The only downside is that we need to manually prevent the click with JavaScript.

---
Remember: ARIA attributes never changes the styles or behavior of on element. Its only purpose is to complement the semantics.
`,
  },
];

// =============

export const formCss = {
  form: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  field: css`
    label {
      margin-right: 8px;
      font-weight: 600;
    }
    input {
      width: 5rem;
      height: 3.5rem;
      border: none;
      border: 1px solid var(--theme-text_1);
      border-radius: 4px;
      text-align: center;
      font-size: 1.8rem;
    }
  `,
  resultsArea: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100px;
    border: 1px dotted var(--theme-primary);
    margin: 16px 0;
    padding: 10px;
  `,
};

export function FieldPages(props) {
  return (
    <div css={formCss.field}>
      <label htmlFor="page">Page</label>
      <input
        id="page"
        type="text"
        // https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="0"
        required
        {...props}
      />
    </div>
  );
}
