import { cases } from "../../exercises/5_animations.exercise.jsx";
import { solutions } from "../../exercises/5_animations.solution.jsx";
import { Chapters } from "../../src/components/pageLayouts/Chapters.jsx";
import { LayoutExercise } from "../../src/components/pageLayouts/LayoutExercise.jsx";

export default function Page() {
  return <Chapters cases={cases} solutions={solutions} />;
}

Page.getLayout = function getLayout(page) {
  return <LayoutExercise title="Exercise 5: Animations">{page}</LayoutExercise>;
};
