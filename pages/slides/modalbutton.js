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
  padding-top: 50px;
  padding-left: 10px;
`;

const Button = styled.button`
  margin-left: 32px;

  position: relative;
  display: inline-block;
  cursor: pointer;
  min-height: 30px;
  padding: 2px 20px;
  background-color: var(--theme-primary);
  border-radius: 4px;
  border: none;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--theme-text_invert);
  text-align: center;

  &:hover:not([aria-disabled="true"]) {
    filter: brightness(1.2);
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }

  &:focus-visible {
    outline: none;
    box-shadow: var(--theme-focus_shadow);
  }

  &[disabled],
  &[aria-disabled="true"] {
    cursor: not-allowed;
    background: #82b8b8; // primary-weak
    color: var(--theme-text_invert);
  }
`;

const ModalShitty = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: block;
  background: var(--theme-bg_1);
  color: var(--theme-text_0);
  border: 1px dashed var(--theme-primary);
  box-shadow: 0 0 12px 4px var(--theme-bg_1);
  text-align: center;
  padding: 20px 40px;
  border-radius: 5px;

  &[hidden] {
    display: none;
  }

  input {
    width: 100px;
    margin-left: 6px;
    margin-bottom: 15px;
    text-align: center;
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
        <Button onClick={() => setIsOpen(true)}>Open dialog</Button>

        <ModalShitty hidden={!isOpen}>
          <p>Code</p>
          <input placeholder="1234"></input>
          <br />
          <button onClick={() => setIsOpen(false)}>Close</button>
        </ModalShitty>
      </Playground>
    </Container>
  );
}
