import { cases } from "../../exercises/2_toggleable.exercise.jsx";
import { solutions } from "../../exercises/2_toggleable.solution.jsx";
import { LayoutExercise } from "../../src/components/pageLayouts/Briefing.jsx";
import { Chapters } from "../../src/components/pageLayouts/Chapters.jsx";

// @TODO move these to LayoutExercise
const chapters = cases.map((materials, i) => ({
  ...materials,
  ...solutions[i],
}));

export default function Page() {
  return <Chapters chapters={chapters} />;
}

Page.getLayout = function getLayout(page) {
  return <LayoutExercise title="Toggleable interfaces">{page}</LayoutExercise>;
};
