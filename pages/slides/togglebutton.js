import { useState } from "react";
import styled, { keyframes } from "styled-components";

const keyFramesGrow = keyframes`
  0%,
  100% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.2);
  }
`;

const Container = styled.div`
  /* Dark theme */
  --theme-text_0: #e2e2e2;
  --theme-bg_0: #3a383b;
  --theme-primary: hsl(180deg 100% 45%);
  --theme-focus_shadow: var(--theme-bg_0) 0 0 0 2px,
    var(--theme-secondary) 0 0 0 4px;

  background: var(--theme-bg_0);
  padding: 10px 10px 40px;
  text-align: left !important;

  .btnStyleCtlr {
    font-size: 1rem;
    margin-left: 20px; /* don't judge my css skills, okay? */
  }

  svg {
    display: inline;
    width: 11px;
  }
`;

const Playground = styled.div`
  height: 30px;
`;

const ButtonToggle = styled.button`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  min-height: 38px;
  padding: 4px 16px;
  border-radius: 12px;
  border: none;
  border: 2px solid;
  background-color: transparent;
  text-decoration: none;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1;
  color: var(--theme-text_0);
  margin-right: 8px;

  &:hover {
    filter: brightness(1.2);
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--theme-focus_shadow);
  }

  &[aria-pressed="true"] {
    color: var(--theme-primary);
    
    svg {
      fill: currentColor;
      animation: ${keyFramesGrow} 250ms ease-out;
    }
  }

  svg {
    width: 18px;
    height: 18px;
    fill: transparent;
    stroke: currentColor;
    margin-right: 8px;
    pointer-events: none; /* prevent JS event.target */
    transition: fill 250ms;
  }
}
`;

export default function Page() {
  const [isActive, setIsActive] = useState(false);
  const [hasStyles, setHasStyles] = useState(true);

  const ToggleTag = hasStyles ? ButtonToggle : "button";
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
        <ToggleTag
          onClick={() => setIsActive((s) => !s)}
          aria-pressed={isActive}
        >
          <IconHeart />
          Favorite
        </ToggleTag>
      </Playground>

      <br />
      <button className="btnStyleCtlr" onClick={() => setHasStyles((b) => !b)}>
        {hasStyles ? "Remove styles" : "Add styles"}
      </button>
    </Container>
  );
}

function IconHeart() {
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 16"
    >
      <path
        d="M9 14.6L2.3 8.1s0 0 0 0a4.5 4.5 0 010-6.4h0C3 1 4 .8 5.3 1.2h0c1 .1 2.1.8 3 1.6l.7.8.7-.8a6 6 0 013-1.6h0c1.4-.4 2.3-.2 3 .5h0a4.5 4.5 0 010 6.4L9 14.6z"
        strokeWidth="2"
      />
    </svg>
  );
}
