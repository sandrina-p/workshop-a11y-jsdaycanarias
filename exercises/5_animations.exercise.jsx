import React from "react";

import { textMonoCSS } from "../src/components/Button";
import { Case, Stack, rotateCSS } from "../src/components/Layout";
import { fakeWaitTime, shuffleDays } from "../src/utils";

function CaseAnimation() {
  const [text, setText] = React.useState("");

  async function revealNumber() {
    setText("");

    const stopShuffle = shuffleDays(setText);
    await fakeWaitTime(1500);
    stopShuffle();

    setText("It's Friday!");
  }

  return (
    <Case title="Animations personalized">
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

// ========================
// You can ignore this part
// ========================

export const cases = [
  {
    id: "animation",
    Exercise: CaseAnimation,
    briefing: ``,
    resources: [
      {
        name: "no-motion-first approach",
        url: "https://www.tatianamac.com/posts/prefers-reduced-motion/",
      },
      {
        name: "usePrefersReducedMotion hook",
        url: "https://www.joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion/",
      },
    ],
    briefing_bonus: ``,
  },
];
