import React from "react";

export const mailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export function fakeWaitTime(ms) {
  // eslint-disable-next-line no-undef
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 *
 * @param {Number} page - Page number
 * @returns {Array<{ id: Number}>} List of products with just id
 */
export async function fetchProducts(page) {
  console.log("Loading products from page:", page);

  if (page === 7) {
    // Simulate a problem with this page for demo purposes.
    await fakeWaitTime(500);
    throw Error("Page 7 is unstable.");
  }

  await fakeWaitTime(2500);

  // Return a dummy array of 10 items. Each item is an object. eg
  // [{ id: 20 }, { id: 21 }, { id: 22 }, { id: 23 }, ...]
  return Array.from(Array(10), (_, i) => ({
    id: `${page}${i}`,
  }));
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

/**
 * A function that quickly iterates over
 * all week days in random order until it's cancelled
 * @param {Function} onUpdate - Callback with the new day
 * @returns {Function} - Function to cancel the animation
 */
export function shuffleDaysAnimation(onUpdate) {
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

const QUERY = "(prefers-reduced-motion: no-preference)";
const isRenderingOnServer = typeof window === "undefined";
const getInitialState = () => {
  // For our initial server render, we won't know if the user
  // prefers reduced motion, but it doesn't matter. This value
  // will be overwritten on the client, before any animations
  // occur.
  return isRenderingOnServer ? true : !window.matchMedia(QUERY).matches;
};

/**
 * usePrefersReducedMotion from Josh W. Comeau — @joshwcomeau
 * @link https://www.joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion/
 * @returns {Boolean} - is motion preferences reduced or not.
 */
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

export function usePlayAudio() {
  const audioOn = React.useRef();
  const audioOff = React.useRef();
  React.useEffect(() => {
    audioOn.current = new Audio(
      "https://freesound.org/data/previews/504/504847_9961300-lq.mp3"
    );
    audioOff.current = new Audio(
      "https://cdn.freesound.org/previews/524/524205_9561949-lq.mp3"
    );
  }, []);

  const setAudio = (isPlaying) =>
    isPlaying ? audioOff.current.play() : audioOn.current.play();

  return { setAudio };
}
