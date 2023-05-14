import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  /* Dark theme */
  --theme-text_0: #e2e2e2;
  --theme-text_invert: #343434;
  --theme-bg_0: #3a383b;
  --theme-bg_1: #2e2a2f;
  --theme-primary: hsl(180deg 100% 45%);
  --theme-primary_smooth: hsl(180deg 100% 19%);
  --theme-error: #ff9d9d;
  --theme-focus_shadow: var(--theme-bg_0) 0 0 0 2px,
    var(--theme-secondary) 0 0 0 4px;

  background: var(--theme-bg_0);
  padding: 0 10px 40px;
  text-align: left !important;
  color: var(--theme-text_0);
`;

const Playground = styled.div`
  height: 30px;
  padding-top: 50px;
  padding-left: 10px;

  color: red;

  details {
    display: inline-block;
    width: 240px;
    color: var(--theme-bg_0);
    transition: color 250ms;

    &[open] {
      color: var(--theme-text_0);
    }
  }
  summary {
    color: var(--theme-text_0);
    cursor: pointer;

    &:hover {
      color: var(--theme-primary);
    }
  }
`;

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container
      style={{
        textAlign: "center",
        transform: "scale(2)",
        transformOrigin: "0 0",
      }}
    >
      <style jsx global>{`
        body {
          overflow: hidden; /* for iframe in slides */
          background: #3a383b; /* dark -> bg_0 */
        }
      `}</style>
      <Playground>
        <details>
          <summary>Do we always need JS?</summary>
          No. Many times HTML and CSS are enough!
        </details>
      </Playground>
    </Container>
  );
}
