import React from "react";

import { buttonCSS, buttonOutlineCSS } from "../src/components/Button";
import { Case, StackXCenter, rotateCSS } from "../src/components/Layout";
import {
  fakeWaitTime,
  shuffleDaysAnimation,
  /* 💡 1/4 Import the hook predefined */
  usePrefersReducedMotion,
} from "../src/utils";

export function CaseAnimation() {
  const [day, setDay] = React.useState("");
  const [isLoading, setIsLoading] = React.useState("");

  // 💡 2/4 Get the real motion preference
  const reducedMotion = usePrefersReducedMotion();

  async function getLuckyDay() {
    if (isLoading) return;

    setIsLoading(true);
    setDay(""); // reset the day

    if (reducedMotion) {
      // 💡 3/4 Replace this animation with a simpler alternative.
      // Removed the shuffle in favor of a simple "Loading..."
      await fakeWaitTime(1500);
    } else {
      const stopShuffle = shuffleDaysAnimation(setDay);
      await fakeWaitTime(1500);
      stopShuffle();
    }

    setIsLoading(false);

    // Fake result (but you get the point)
    setDay("Friday");
  }

  return (
    <Case title="Animations personalized">
      <StackXCenter mb="16px">
        <button onClick={getLuckyDay} css={buttonCSS}>
          Reavel the lucky day
        </button>
        <button onClick={() => setDay("")} css={buttonOutlineCSS}>
          Reset
        </button>

        <p>Motion: {reducedMotion ? "reduced" : "no-preference"}</p>
      </StackXCenter>

      {/* 🍀 Accessible Loading - Always set an invisible loading for SRs... */}
      {isLoading && (
        <p aria-live="assertive" className="sr-only">
          Loading...
        </p>
      )}

      {isLoading &&
        (reducedMotion ? (
          // 💡 4/4 Provide an alternative loading when motion is reduced.
          <p>Loading...</p>
        ) : (
          // 🍀 Remember to hide animations with text from SR
          // otherwise it will announce an random day if the user
          // reaches this element during the loading time.
          <div aria-hidden="true">{day}</div>
        ))}

      {/* 💡 Final result - Announce it with live region */}
      {!isLoading && !!day && (
        <p aria-live="assertive">
          {`Its ${day}!`} <FireIcon />
        </p>
      )}

      {/* A tiny square just to know if the 
      reduced-motion is enabled or not */}
      <div css={rotateCSS}></div>
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

function FireIcon() {
  // Decorative element - SR don't have to read it.
  return <span aria-hidden="true">🔥</span>;
}

export const solutions = [
  {
    Solution: CaseAnimation,
    explanation: `
Using \`window.matchMedia()\` is powerful but complex.
Using \`usePrefersReducedMotion()\` custom hook makes our lifes much easier.

Use its returned value (a boolean \`reducedMotion\`)
to replace any fancy animation with a simpler version.
In this case we used it to simply show a "Loading..." text.

---

Besides the animation, apply what you learned so far:
- Set a Live Region in the loading element
- Hide the shuffled day while it's loading to not confuse the screen reader.
    `,
  },
];
