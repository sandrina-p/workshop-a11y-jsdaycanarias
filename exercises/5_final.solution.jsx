import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@reach/tabs";
import Image from "next/image";
import Link from "next/link";
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
import ImgMonstera from "../public/imgs/monstera.png";
import {
  getSingOrPlural,
  usePrefersReducedMotion,
  usePrevious,
} from "../utils";
import * as Styles from "./5_final.styled";

const CART_COUNT_LIMIT = 5;

/*

A11Y Acceptance Criteria:

- Product
  - [x] The h1 of the page is "Monstera Deliciosa"
  - [ ] The Cart button is a link.
    - Currently, the cart is a button here.
  - [x] The plant image has a meaningful description (alt)
- "Add to Cart":
  - [ ] The "Add to Cart" tooltip is accessible by keyboard.
    - Currently, the tooltip is only accessible with mouse because the button has "disabled="true"
  - [ ] The cart count is announced when it changes.
    - Currently, the cart changes but the sr-only label is not intuitive. 
  - [ ] The cart count is announced when it changes.
    - Currently, the cart count is not announced.
- Tabs
  - [ ] The Tabs are fully accessible
    - Currently, the tabs use incorrect ARIA attributes and the hidden panels are not hidden from SRs.
- Back to button
  - [ ] The "Back to button" button has a sr-only label
    - Currently, the button is empty.
  - [ ] The "Back to button" button moves focus to the top of the page (h1)
    - Currently, the page scrolls to the top but the focus stays at the button.
  - [ ] The "Back to button" button scrolling transition respects user preferences.
    - Currently, the scroll is always "smooth".
- Breadcrumbs
  - [ ] The Breadcrumb describes semantically which item is the current one.
    - Currently, it's not perceivable for SRs which one is the current item.
    - Currently, the links color don't have enough contrast.
- Markup misc:
  - [x] The "On Sale" appears on top of the h1, but in the DOM is after the h1.
  - [ ] The price old/new is described with hidden names for SRs.
    - Currently, the price is not understandable for SRs.
  - [ ] All major parts of the page have headings, even if just .sr-only.

*/

export default function Solution() {
  const reducedMotion = usePrefersReducedMotion();

  const refTitle = React.useRef();

  const [cartCount, setCartCount] = React.useState(0);
  const prevCartCount = usePrevious(cartCount);
  const hasCartChanged =
    prevCartCount !== undefined && prevCartCount !== cartCount;
  const isCartFull = cartCount >= CART_COUNT_LIMIT;

  function handleAddToCartClick(e) {
    if (isCartFull) {
      e.preventDefault();
      return;
    }

    setCartCount((c) => c + 1);
  }

  function handleBackToTop() {
    // Scroll back to top
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth",
    });

    refTitle.current.focus({
      // 💡 without default scroll behavior — it's done by window.scrollTo()
      preventScroll: true,
    });
  }

  console.log("hasCartChanged", hasCartChanged);

  return (
    <Case>
      <div css={Styles.header}>
        <h1 css={Styles.plantName} ref={refTitle} tabIndex="-1">
          Monstera Deliciosa
        </h1>
        <p css={[Styles.headerTag, Styles.tagSecondary]}>
          {/* 💡 Notice how we use CSS to visually displays "On Sale" before the h1, without modifying the DOM order. */}
          On Sale
        </p>
        <Link href="/plants/cart" passHref>
          <a css={Styles.cartBtn}>
            <IconCart />
            <span aria-hidden="true">
              {/* 💡 Replace the visual label... */}
              {cartCount}
            </span>
            <SROnly aria-live="assertive">
              {/* 💡 ... with a specific SR label. */}
              {`${cartCount} ${getSingOrPlural(
                cartCount,
                "plant",
                "plants"
              )} in cart.`}

              {/* 💡 We use a literal template `` to ensure React renders everything as single Node, 
                so that the SR also reads it with pauses. For instance, the <span> below wouldn't work.
                The SR would say "2 [pause] plants [pause] in cart.". */}
              {/* <span>
                {cartCount} {getSingOrPlural(cartCount, "plant", "plants")} in
                cart.
              </span> */}
            </SROnly>
          </a>
        </Link>
      </div>

      <div css={Styles.info}>
        <div>
          <Stack gap="12px">
            <Stack direction="column" alignItems="flex-start">
              <h2 css={Styles.srOnly}>
                {/* 💡 Add hidden titles for easier navigation (Operable) */}
                Product
              </h2>
              <p>
                Monstera deliciosa, also known as the Swiss cheese plant, is a
                species of flowering plant native to tropical forests of
                southern Mexico, south to Panama.
              </p>
              <div css={Styles.price}>
                {/* 💡 On VoiceVocer the SR announces the price differently
              depending on how we structure the price: */}
                <p css={Styles.priceOriginal}>
                  {/* 💡 Announced: "Old price column, dolar four zero, point zero zero  */}
                  <SROnly>Old price:</SROnly> $40.00
                </p>
                <p css={Styles.priceFinal}>
                  {/* 💡 Announced: "New price: thirty dolars and zero cents" */}
                  <SROnly>New price: $30.00</SROnly>
                  <span aria-hidden="true">$30.00</span>
                </p>
                {/* 💡 Insight: When formating sentences with signs
                that influence pronunciation (:, ?, $), double-check how SR announce it  */}
              </div>

              <Tooltip>
                {/* 💡 Note: The <Tooltip /> itself is accessible :) */}
                <button
                  css={Styles.btnCta}
                  onClick={handleAddToCartClick}
                  // Replace "disabled" with "aria-disabled" to keep the focus working.
                  // Know more at https://css-tricks.com/making-disabled-buttons-more-inclusive/
                  aria-disabled={isCartFull}
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
                // 💡 Bonus: Learn about meaningful alt descriptions:  https://jakearchibald.com/2021/great-alt-text/
                alt="a plant in a vase"
              />
            </div>
          </Stack>
        </div>
      </div>

      <div css={Styles.tabs}>
        {/* 💡 Creating accessible Tabs is harder than it looks like.
          Prefer using an accessible library from the community.
          eg. @reach-ui/tabs https://reach.tech/tabs */}
        <Tabs>
          <h2 css={Styles.srOnly}>Details</h2>
          <TabList>
            <Tab>Characteristics</Tab>
            <Tab>Cultivation</Tab>
            <Tab>Toxicity</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <h3>Characteristics</h3>
              <p css={Styles.placeholder}>Some main characteristcs here.</p>
            </TabPanel>
            <TabPanel>
              <h3>Cultivation</h3>
              <p css={Styles.placeholder}>Content about cultivation.</p>
            </TabPanel>
            <TabPanel>
              <h3>Toxicity</h3>
              <p css={Styles.placeholder}>More info about Toxicity here.</p>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <section css={Styles.details}>
          <h2>Similar plants</h2>
          <p css={Styles.placeholder}>Content that fits here.</p>
        </section>

        <Stack justifyContent="flex-end" my="12px">
          <button onClick={handleBackToTop} css={Styles.btnTop}>
            <IconArrowTop />
            {/* 💡 Add a name for SRs */}
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
    // 💡 A navigation should include a name for SRs
    <nav aria-label="Breadcrumb">
      {/* 💡 As a breadcrumb, it should be a ordered list (instead of ul) */}
      <ol css={Styles.breadcrumbs}>
        {items.map(({ name, href, isCurrent }) => (
          // 💡 Each item must have enough color contrast
          <li
            key={name}
            // 💡 Make it semantically explicit what's the current location the user is within the breadcrumb
            {...(isCurrent && { "aria-current": "location" })}
            css={isCurrent && Styles.breadcrumbsCurrent}
          >
            {href ? <Link href={href}>{name}</Link> : <span>{name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
