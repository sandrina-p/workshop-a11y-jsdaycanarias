import { cases } from "../../exercises/7_advanced_keyboard.exercise.jsx";
import { solutions } from "../../exercises/7_advanced_keyboard.solution.jsx";
import { Chapters } from "../../src/components/pageLayouts/Chapters.jsx";
import { LayoutExercise } from "../../src/components/pageLayouts/LayoutExercise.jsx";

export default function Page() {
  return <Chapters cases={cases} solutions={solutions} />;
}

Page.getLayout = function getLayout(page) {
  return (
    <LayoutExercise title="Exercise 7: Advanced keyboard">
      {page}
    </LayoutExercise>
  );
};
