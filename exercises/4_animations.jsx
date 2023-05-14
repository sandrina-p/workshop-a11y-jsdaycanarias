import React from "react";

import { textMonoCSS } from "../components/Button";
import { Case, Stack, rotateCSS } from "../components/Layout";
import { useContextExercise } from "../components/pageLayouts/LayoutExercise";
import { fakeWaitTime, shuffleDays, usePrefersReducedMotion } from "../utils";

function Exercise() {
  const [text, setText] = React.useState("");
  const [isLoading, setIsLoading] = React.useState("");

  async function revealNumber() {
    setText("");
    setIsLoading(true);

    const stopShuffle = shuffleDays(setText);
    await fakeWaitTime(1500);
    stopShuffle();

    setIsLoading(false);
    setText("It's Friday!");
  }

  return (
    <Case title="Animations personalized" refs={refs.motion}>
      <div css={rotateCSS}></div>
      <Stack>
        <button onClick={revealNumber}>Reavel lucky week day</button>
        <button onClick={() => setText("")}>Reset</button>
        <p>Motion: Yes</p>
      </Stack>
      <br />
      <p css={textMonoCSS}>{text}</p>
    </Case>
  );
}

/*

*
*
*
*
*
*
*
*
*
*

🚨   SPOILERS AHEAD   🚨

🛑 DO NOT SCROLL MORE 🛑 

🙈   SOLUTION BELOW   🙈


*
*
*
*
*
*
*
*
*
*

*/

function Solution() {
  const [text, setText] = React.useState("");
  const [isLoading, setIsLoading] = React.useState("");
  // 💡 Use CSS media queries in JavaScript to customize animations.
  const reducedMotion = usePrefersReducedMotion();

  async function revealNumber() {
    setText("");
    setIsLoading(true);

    if (reducedMotion) {
      // 💡 Provide a simple transition when there's no animations
      setText("Loading...");
      await fakeWaitTime(1500);
    } else {
      const stopShuffle = shuffleDays(setText);
      await fakeWaitTime(1500);
      stopShuffle();
    }

    setIsLoading(false);
    setText("It's Friday!");
  }

  return (
    <Case title="Animations personalized" refs={refs.motion}>
      <div css={rotateCSS}></div>
      <Stack>
        <button onClick={revealNumber}>Reavel lucky week day</button>
        <button onClick={() => setText("")}>Reset</button>
        <p>Motion: {reducedMotion ? "reduce" : "no-preference"}</p>
      </Stack>
      <br />
      {isLoading && (
        <p aria-live="assertive" className="sr-only">
          Loading...
        </p>
      )}
      <p css={textMonoCSS}>{text}</p>
    </Case>
  );
}

// =============
// =============
// =============
// =============

// Unrelevant boilerplate code / data / css for this exercise

export default function Page() {
  const { variant } = useContextExercise();
  return variant === "exercise" ? <Exercise /> : <Solution />;
}

var refs = {
  motion: [
    {
      name: "no-motion-first approach",
      url: "https://www.tatianamac.com/posts/prefers-reduced-motion/",
    },
    {
      name: "usePrefersReducedMotion hook",
      url: "https://www.joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion/",
    },
  ],
};
