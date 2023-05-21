import React from "react";

import { buttonCSS, buttonOutlineCSS } from "../src/components/Button";
import { Case, StackXCenter, rotateCSS } from "../src/components/Layout";

function CaseTabs() {
  return <Case title="Shortcuts">coming</Case>;
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
    id: "tabs",
    Exercise: CaseTabs,
    briefing: ` `,
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
    briefing_bonus: ``,
  },
];
