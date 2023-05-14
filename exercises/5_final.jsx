import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { linkCSS } from "../components/Button";
import {
  Case,
  IconArrowTop,
  IconCart,
  SROnly,
  Stack,
} from "../components/Layout";
import { Tooltip, TooltipBox, TooltipItself } from "../components/Tooltip";
import { useContextExercise } from "../components/pageLayouts/LayoutExercise";
import ImgMonstera from "../public/imgs/monstera.png";
import Solution from "./5_final.solution";
import * as Styles from "./5_final.styled";

/**
🎯 Goal:
 1. Write the AC for this page:
 2. Verify if the page complies or has extra a11y bugs [x]
 3. Fix the issues you've found. (if you have time)


1. A11Y Acceptance Criteria:

- [x] The h1 of the page is "Monstera Deliciosa"
- [ ] The Cart is a link.
  - 🐛 Currently, the cart is a button here.
- [x] The plant image has a meaningful description (alt)
- [ ] ... What else? 
- [ ] ...

------

🍀 Some tips:

1. While analyzing the page, ask yourself the "POUR questions":
  - P: How can X be indentified? (Perceived)
  - O: How can X be used? (Operable)
  - U: How can X be intuitive? (Understadable)
  - R: How can X be supported? (Robust)

2. Imagine the page without styles, to help you imagine.
  (Use the "Web Developer" browser extension: Click "CSS" -> "Disable All Styles")

3. Use a Screen Reader to navigate the page.

 */

const CART_COUNT_LIMIT = 5;

function Exercise() {
  const router = useRouter();

  const [cartCount, setCartCount] = React.useState(0);
  const [tabIdCurrent, setTabIdCurrent] = React.useState(0);
  const isCartFull = cartCount >= CART_COUNT_LIMIT;

  function handleCartClick() {
    router.push("/plants/cart");
  }

  function handleAddToCartClick() {
    setCartCount((c) => c + 1);
  }

  function handleBackToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <Case>
      <div css={Styles.header}>
        <span css={[Styles.headerTag, Styles.tagSecondary]}>On Sale</span>
        <h1 css={Styles.plantName}>Monstera Deliciosa</h1>

        <button onClick={handleCartClick} css={Styles.cartBtn}>
          <IconCart />
          <span>{cartCount}</span>
        </button>
      </div>

      <div css={Styles.info}>
        <div>
          <Stack gap="12px">
            <Stack direction="column" alignItems="flex-start">
              <p>
                Monstera deliciosa, also known as the Swiss cheese plant, is a
                species of flowering plant native to tropical forests of
                southern Mexico, south to Panama.
              </p>
              <div css={Styles.price}>
                <p css={Styles.priceOriginal}>$40.00</p>
                <h2 css={Styles.priceFinal}>$30.00</h2>
              </div>

              <Tooltip>
                {/* 💡 Note: The <Tooltip /> component is accessible. */}
                <button
                  css={Styles.btnCta}
                  onClick={handleAddToCartClick}
                  disabled={isCartFull}
                  aria-describedby="disabledReason"
                >
                  Add to cart
                </button>

                <TooltipBox role="tooltip" id="disabledReason">
                  {isCartFull && (
                    <TooltipItself>
                      You cannot have more than 5 plants in the cart.
                    </TooltipItself>
                  )}
                </TooltipBox>
              </Tooltip>
              {isCartFull && (
                <button
                  onClick={() => setCartCount((c) => c - 2)}
                  css={linkCSS}
                >
                  Remove 2 plants
                </button>
              )}
            </Stack>

            <div css={[Styles.media]}>
              <Image
                css={Styles.mediaImg}
                src={ImgMonstera}
                alt="a plant in a vase"
              />
            </div>
          </Stack>
        </div>
      </div>

      <div css={Styles.tabs}>
        {/* 💡 Note: Honestly, you can ignore this Tabs implementation, it sucks, (it was based on a real world example 😱).
          Implementing an accessible Tab component will take longer than this workshop allows,
          so your goal here is to *write down* the A11Y features that are needed for a fully 
          Tabs component, and what bugs you've found in this implementation.  */}
        <div>
          <div data-css-tab-list>
            <button
              data-css-tab-btn
              onClick={() => setTabIdCurrent(0)}
              aria-current={tabIdCurrent === 0}
            >
              Characteristics
            </button>
            <button
              data-css-tab-btn
              onClick={() => setTabIdCurrent(1)}
              aria-current={tabIdCurrent === 1}
            >
              Cultivation
            </button>
            <button
              data-css-tab-btn
              onClick={() => setTabIdCurrent(2)}
              aria-current={tabIdCurrent === 2}
            >
              Toxicity
            </button>
          </div>
          <div data-css-tab-panels>
            <div data-css-tab-panel aria-current={tabIdCurrent === 0}>
              <h3>Characteristics</h3>
              <p css={Styles.placeholder}>Some main characteristcs here.</p>
            </div>
            <div data-css-tab-panel aria-current={tabIdCurrent === 1}>
              <h3>Cultivation</h3>
              <p css={Styles.placeholder}>Content about cultivation.</p>
            </div>
            <div data-css-tab-panel aria-current={tabIdCurrent === 2}>
              <h3>Toxicity</h3>
              <p css={Styles.placeholder}>More info about Toxicity here.</p>
            </div>
          </div>
        </div>

        <section css={Styles.details}>
          <h2>Similar plants</h2>
          <p css={Styles.placeholder}>Content that fits here.</p>
        </section>

        <Stack justifyContent="flex-end" my="12px">
          <button onClick={handleBackToTop} css={Styles.btnTop}>
            <IconArrowTop />
            <SROnly>Back to top</SROnly>
          </button>
        </Stack>

        <Breadcrumbs
          items={[
            {
              name: "Plants",
              href: "/plants",
            },
            {
              name: "Tropical",
              href: "/plants?category=tropical",
            },
            {
              name: "Monstera Deliciosa",
              isCurrent: true,
            },
          ]}
        />
      </div>
    </Case>
  );
}

function Breadcrumbs({ items }) {
  return (
    <nav>
      <ul css={Styles.breadcrumbs}>
        {items.map(({ name, href, isCurrent }) => (
          <li
            key={name}
            {...(isCurrent && { "aria-current": "location" })}
            css={isCurrent && Styles.breadcrumbsCurrent}
          >
            {href ? <Link href={href}>{name}</Link> : <span>{name}</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
}

// =============

// Unrelevant boilerplate code for this exercise

export default function Page() {
  const { variant } = useContextExercise();
  return variant === "exercise" ? <Exercise /> : <Solution />;
}
