import * as Dialog from "@radix-ui/react-dialog";
import React, { useRef } from "react";
import { css } from "styled-components";

import { buttonCSS, buttonOutlineCSS } from "../src/components/Button";
import { Case, StackY, TextError, fadeIn } from "../src/components/Layout";

function CaseCSSOnly() {
  return (
    <Case title="CSS-only Dialog">
      {/* This anchor link changes the URL. Then with
      CSS &:target {} you make the modal visible. */}
      <a href="#brokenDialog" css={buttonCSS}>
        Open CSS-only Dialog
      </a>

      <div id="brokenDialog" css={stylesForCssDialog.modal}>
        <div css={stylesForCssDialog.modal_content}>
          <h2>CSS-only Dialog</h2>

          <InfoAboutCSSOnlyDialogs />

          {/* This anchor link changes back the URL */}
          <a href="#" css={buttonOutlineCSS}>
            Close
          </a>
        </div>
      </div>
    </Case>
  );
}

function CaseDialogElement() {
  const refDialog = useRef();
  const dialogId = "myDialog";

  return (
    <Case title="Native: The <dialog> Element">
      <button
        // Open the modal
        onClick={() => refDialog.current.showModal()}
        css={buttonCSS}
      >
        Open Native Dialog
      </button>

      <dialog id={dialogId} ref={refDialog}>
        <h2>Native Dialog</h2>

        <InfoAboutNativeDialog />

        <form formNoValidate>
          <button
            type="button"
            // 💡 <form> is required for close() to work
            // bug: In Chrome, DevTools can't be open, otherwise the site crashes. Don't know why
            onClick={() => refDialog.current.close("close")}
          >
            Close
          </button>
        </form>
      </dialog>
    </Case>
  );
}

function CasePackages() {
  return (
    <Case title="Dialog from the community">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button css={buttonCSS}>Open Custom Dialog</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay css={stylesForRadix.overlay} />
          <Dialog.Content css={stylesForRadix.content}>
            <Dialog.Title>Dialog with Radix-ui</Dialog.Title>

            <InfoAboutPackages />

            <Dialog.Close asChild>
              <button>Close</button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Case>
  );
}

// ==========
// Helpers
// ==========

function InfoAboutCSSOnlyDialogs() {
  return (
    <StackY gap="16px" my="16px">
      <p>
        <TextError>
          No, you cannot create an accessible dialog with just CSS.
        </TextError>{" "}
        (Code stolen from{" "}
        <a href="https://twitter.com/denicmarko/status/1350761109360414721">
          this tweet
        </a>
        )
      </p>

      <p>Read the briefing to know what's missing.</p>

      <p>
        Next time you implement your own modal, think twice. It's harder than it
        looks like.
      </p>
    </StackY>
  );
}

var stylesForCssDialog = {
  wrapper: css``,
  modal: css`
    visibility: hidden;
    opacity: 0;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 9;
    /* 🐛 "flex" makes inner links to be accessible by
    keyboard when the modal is open. Replace it with "none" */
    /* display: flex; */
    display: none;
    align-items: center;
    justify-content: center;
    background-color: rgba(77, 77, 77, 0.7);
    transition: all 0.4s;

    &:target {
      visibility: visible;
      display: flex;
      opacity: 1;
    }
  `,
  modal_content: css`
    border-radius: 4px;
    position: relative;
    width: 500px;
    max-width: 90%;
    background: #fff;
    padding: 1em 2em;
  `,
};

function InfoAboutNativeDialog() {
  return (
    <StackY gap="16px" my="16px">
      <p>
        This uses the{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement#examples">
          <code>{"<dialog>"}</code> element
        </a>{" "}
        and essential requirement JS.
      </p>

      <p>Read the briefing to know its advantages and limitations.</p>
    </StackY>
  );
}

function InfoAboutPackages() {
  return (
    <StackY gap="16px" my="16px">
      <p>
        This dialog uses{" "}
        <a href="https://www.radix-ui.com/docs/primitives/components/dialog">
          <code>radix-ui</code>
        </a>
        , a React library with unstyled accessible components.
      </p>

      <p>All the problems noticed in the other scenarios are solved here.</p>
    </StackY>
  );
}

var stylesForRadix = {
  overlay: css`
    background-color: rgba(77, 77, 77, 0.7);
    position: fixed;
    inset: 0;
    animation: ${fadeIn} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  `,
  content: css`
    background-color: white;
    border-radius: 6px;
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
      hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 450px;
    max-height: 85vh;
    padding: 25px;
    animation: ${fadeIn} 150ms cubic-bezier(0.16, 1, 0.3, 1);

    &:focus {
      outline: none;
    }
  `,
};

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
    id: "cssOnly",
    Exercise: CaseCSSOnly,
    briefing: `CSS-Only solutions are cool, but not always.

A Dialog is a complex component that must have JavaScript to be fully accessible.

What's wrong with this demo:
- Keyboard shortcuts: eg Escape key to close.
- On open, focus does not go automatically to inside modal, and it is not trapped inside.
- You cannot close it by clicking outside.
- On close, focus doesn't go back to the trigger button.
- The semantics (it shouldn't be an anchor link!)
- Missing ARIA attributes to the dialog itself.

Is this list long enough?
`,
    resources: [
      {
        name: "Dialog vs Modal naming",
        url: "https://hidde.blog/dialog-modal-popover-differences/",
      },
    ],
    briefing_bonus: `
GitHub's modals are also CSS-Only, but using \`<details>\`.
For example, visit ["Setting page"](https://github.com/settings/admin),
then [turn off JS](https://developer.chrome.com/docs/devtools/javascript/disable/), and try to open "Change username" modal. 

It opens but it's partially broken (for example the Close button doesn't work).


You could look at this solution as a ["graceful degradation"](https://developer.mozilla.org/en-US/docs/Glossary/Graceful_degradation) technique,
for when you need to build a site without JS.`,
  },
  {
    id: "dialogEl",
    Exercise: CaseDialogElement,
    briefing: `
The [\`<dialog>\`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement#examples) has a lot of benefits such as:
- The Keyboard shortcuts work (eg Escape to exist).
- The focus is trapped inside the modal.
- The semantics are correct by default (no need for ARIA attributes).
- Supported by all [major browsers](https://caniuse.com/dialog).
- But is still limited to handle complex scenario.
    `,
    resources: [
      {
        name: "Use the dialog element (reasonably)",
        url: "https://www.scottohara.me/blog/2023/01/26/use-the-dialog-element.html",
      },
    ],
  },
  {
    id: "package",
    Exercise: CasePackages,
    briefing: `
[\`radix-ui\`](https://www.radix-ui.com/) is my favorite solution for accessible components in React. 
Here's another great libraries:

- [\`react-a11y-dialog\`](https://github.com/KittyGiraudel/react-a11y-dialog): Minimal standalone package
- [\`Reach\`](https://reach.tech/dialog): A Components library focused on A11Y.

---

Before you use a package from the community, 
don't get sold by ["self-claimed" accessible components](https://hiddedevries.nl/en/blog/2021-04-02-accessible-front-end-components-claims-vs-reality).
Do your own research and aim to know their reality before you include their code in your codebase.
    
    `,
    resources: [
      {
        name: "Differences between dialogs",
        url: "https://github.com/KittyGiraudel/react-a11y-dialog/issues/58",
      },
      {
        name: "Build or install. How to decide?",
        url: "https://css-tricks.com/dialog-components-roll-your-own/",
      },
    ],
  },
];
