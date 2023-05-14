import React from "react";

export const mailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export function fakeWaitTime(ms) {
  // eslint-disable-next-line no-undef
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchFakeLottery(time = 1500, defaultResultType) {
  const possibilities = ["win", "lose", "error"];
  const resultType =
    defaultResultType ||
    possibilities[Math.floor(Math.random() * possibilities.length)];

  await fakeWaitTime(time);
  switch (resultType) {
    case "win":
      return { type: resultType, msg: "Yey, you won the lottery! 🎉" };
    case "lose":
      return { type: resultType, msg: "Ah... more luck next time..." };
    case "error":
      throw Error("Ups, the server is down, plese try again.");
    default:
      break;
  }
}

export function randomNr(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

export function shuffleDays(onUpdate) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let current = randomNr(0, 6);
  onUpdate(days[current]);

  const loop = setInterval(() => {
    current = current + 1 === 7 ? 0 : current + 1;
    onUpdate(days[current]);
  }, 75);

  const cancel = () => clearTimeout(loop);

  return cancel;
}

export function getSingOrPlural(count, singular, plural) {
  return count === 1 ? singular : plural;
}

export function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

// usePrefersReducedMotion from Josh W. Comeau — @joshwcomeau
// https://www.joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion/

const QUERY = "(prefers-reduced-motion: no-preference)";
const isRenderingOnServer = typeof window === "undefined";
const getInitialState = () => {
  // For our initial server render, we won't know if the user
  // prefers reduced motion, but it doesn't matter. This value
  // will be overwritten on the client, before any animations
  // occur.
  return isRenderingOnServer ? true : !window.matchMedia(QUERY).matches;
};

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    React.useState(getInitialState);
  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    const listener = (event) => {
      setPrefersReducedMotion(!event.matches);
    };
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", listener);
    } else {
      mediaQueryList.addListener(listener);
    }
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener("change", listener);
      } else {
        mediaQueryList.removeListener(listener);
      }
    };
  }, []);
  return prefersReducedMotion;
}
