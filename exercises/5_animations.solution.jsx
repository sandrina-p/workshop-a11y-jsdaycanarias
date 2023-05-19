import React from "react";

import { textMonoCSS } from "../src/components/Button";
import { Case, Stack, rotateCSS } from "../src/components/Layout";
import {
  fakeWaitTime,
  shuffleDays,
  usePrefersReducedMotion,
} from "../src/utils";

export function CaseAnimation() {
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
    <Case title="Animations personalized">
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

// ========================
// You can ignore this part
// ========================

export const solutions = [
  {
    Solution: CaseAnimation,
    explanation: ``,
  },
];
