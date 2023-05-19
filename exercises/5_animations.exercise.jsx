import React from "react";

import { textMonoCSS } from "../src/components/Button";
import { Case, Stack, rotateCSS } from "../src/components/Layout";
import { fakeWaitTime, shuffleDays } from "../src/utils";
import { refs } from "./4_animations.base";

export function Exercise() {
  const [text, setText] = React.useState("");

  async function revealNumber() {
    setText("");

    const stopShuffle = shuffleDays(setText);
    await fakeWaitTime(1500);
    stopShuffle();

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
