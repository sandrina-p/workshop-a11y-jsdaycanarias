import { cases } from "../../exercises/1_routing.exercise.jsx";
import { solutions } from "../../exercises/1_routing.solution.jsx";
import { LayoutExercise } from "../../src/components/pageLayouts/Briefing.jsx";
import { Chapters } from "../../src/components/pageLayouts/Chapters.jsx";

const chapters = cases.map((materials, i) => ({
  ...materials,
  ...solutions[i],
}));

export default function Page() {
  return <Chapters chapters={chapters} />;
}

Page.getLayout = function getLayout(page) {
  return <LayoutExercise title="Routing">{page}</LayoutExercise>;
};
