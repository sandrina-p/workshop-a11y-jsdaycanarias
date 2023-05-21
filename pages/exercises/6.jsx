import { cases } from "../../exercises/6_dialog.exercise.jsx";
import { solutions } from "../../exercises/6_dialog.solution.jsx";
import { Chapters } from "../../src/components/pageLayouts/Chapters.jsx";
import { LayoutExercise } from "../../src/components/pageLayouts/LayoutExercise.jsx";

export default function Page() {
  return <Chapters cases={cases} solutions={solutions} />;
}

Page.getLayout = function getLayout(page) {
  return <LayoutExercise title="Exercise 6: Dialogs">{page}</LayoutExercise>;
};
