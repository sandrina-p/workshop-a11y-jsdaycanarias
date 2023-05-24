import React from "react";

import { buttonCSS, buttonOutlineCSS } from "../src/components/Button";
import { Case, StackXCenter, rotateCSS } from "../src/components/Layout";
import {
  fakeWaitTime,
  shuffleDaysAnimation,
  /* 💡 1/4 Import the hook predefined */
  // usePrefersReducedMotion,
} from "../src/utils";

function CaseAnimation() {
  const [day, setDay] = React.useState("");
  const [isLoading, setIsLoading] = React.useState("");

  // 💡 2/4 Get the real motion preference
  const reducedMotion = false;

  async function getLuckyDay() {
    if (isLoading) return;

    setIsLoading(true);
    setDay(""); // reset the day

    const stopShuffle = shuffleDaysAnimation(setDay);

    // 💡 3/4 Replace this animation with a simpler alternative.
    // For example, just show "Loading..." in the page.
    await fakeWaitTime(1500);
    stopShuffle();

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

      {isLoading && (
        // 💡 4/4 Provide an alternative loading when motion is reduced.
        <p>{day}</p>
      )}

      {!isLoading && !!day && (
        // Final result
        <p>
          It is {day}! <FireIcon />
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

export const cases = [
  {
    id: "animation",
    Exercise: CaseAnimation,
    briefing: `
We tend to use animations as a way to turn the UX more delightful.
But remember, **animations are an enhancement** and shouldn't be an excuse to ignore accessibility.

Users might find animations distracting or uncomfortable. Some can't even see the animations, such as people with cognitive disabilities or slow devices.

---

In this exercise, users might prefer to not see the lucky day animation.
We can turn animations off with CSS media query [\`preferes-reduced-motion\`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).
We can use it in JS too with [\`window.matchMedia()\`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia), respecting the user's motion preferences. 

Let's go!

---

Tip: In Chrome, you can emulate a motion settings. Open Dev Tools, go to Settings > Rendering. Scroll down until "Emulate CSS media" section and select the preferred motion setting. [How to emulate in other browsers](https://stackoverflow.com/questions/59708960/how-do-i-change-the-prefers-reduced-motion-setting-in-browsers/59709067#59709067).
    `,
    resources: [
      {
        name: "React Hook: usePrefersReducedMotion()",
        url: "https://www.joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion/",
      },
      {
        name: "no-motion-first approach",
        url: "https://www.tatianamac.com/posts/prefers-reduced-motion/",
        extra: true,
      },
    ],
    briefing_bonus: `
Remember, "Reduced Motion" is not the same as "Disabled Motion".
You don't need to add \`animation: none;\` everywhere when the motion is reduced. 

That's boring.

The trick is to *simplify* the transitions of your animations. Go share this tip with your Design team. 🧑‍🎨 
    `,
  },
];
