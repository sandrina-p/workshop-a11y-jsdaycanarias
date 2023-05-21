import { cases } from "../../exercises/3_loadings.exercise.jsx";
import { solutions } from "../../exercises/3_loadings.solution.jsx";
import { Chapters } from "../../src/components/pageLayouts/Chapters.jsx";
import { LayoutExercise } from "../../src/components/pageLayouts/LayoutExercise.jsx";

export default function Page() {
  return <Chapters cases={cases} solutions={solutions} />;
}

Page.getLayout = function getLayout(page) {
  return (
    <LayoutExercise title="Exercise 3: Loading content">{page}</LayoutExercise>
  );
};
