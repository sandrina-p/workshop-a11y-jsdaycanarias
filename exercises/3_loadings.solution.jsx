import React from "react";

import { buttonCSS } from "../src/components/Button";
import { Case, TextError } from "../src/components/Layout";
import { Tooltip } from "../src/components/Tooltip";
import { fetchProducts } from "../src/utils";
import { FieldPages, formCss } from "./3_loadings.exercise";

function Exercise() {
  const [page, setPage] = React.useState("");
  const [products, setProcuts] = React.useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = React.useState(false);
  const [productsError, setProductsError] = React.useState(null);

  const isFormValid = page >= 1 && page <= 99;
  const isProductsOkay = !productsError && !isLoadingProducts;
  const isFormSubmitActive = isFormValid && !isLoadingProducts;

  async function handleSubmit(e) {
    e.preventDefault(); // avoid native form submit (page refresh)

    // 🍀 Bonus[2/2]: Prevent submit when aria-disabled="true"
    if (!isFormSubmitActive) return false;

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
      {/* 💡 All is good in this form. Jump to the results area */}
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
              // 🍀 Bonus[1/2] Accessible disabled button
              aria-disabled={!isFormSubmitActive}
            >
              Get products
            </button>
          }
          content="Choose from page 1 to 9"
        />
      </form>

      {/* 💡 All changes will be done inside this div */}
      <div css={formCss.resultsArea}>
        {/* Empty State */}
        {products.length === 0 && isProductsOkay && <p>No products yet.</p>}

        {/* 💡 Loading state */}
        {isLoadingProducts && <p aria-live="assertive">Loading products...</p>}

        {/* 💡 Error state */}
        {productsError && (
          <TextError aria-live="assertive">{productsError}</TextError>
        )}

        {/* Products list */}
        {products.length > 0 && isProductsOkay && (
          <div>
            {/* 💡 In long results do not use aria-live in the wrapper.
            Instead, add a hidden live element with just a summary. */}
            <p aria-live="assertive" className="sr-only">
              {`Page ${page} loaded with ${products.length} products.`}
            </p>

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

export const solutions = [
  {
    Solution: Exercise,
    explanation: `
To solve this, we need to use ARIA Live Regions. 
The \`aria-live\` attribute accepts one of three values:

- \`"assertive"\`: The content is announced immediately when in the DOM. Use it when the content is essential to know. (eg. a field error)
- \`"polite"\`: The content is announced when there's nothing else to be announced. Use it when it's not related to the main task. (eg. a notification)
- \`"off"\`: The content is not announced. It's (the default value when the attribute is not declared).

In this case it's using \`assertive\` because all the dynamic content is essential.

Here's a [codepen](https://codepen.io/vloux/details/jxPrWy) exploring multiple 
ways of using \`aria-live\` (correct and wrong ways). 
    `,
  },
];
