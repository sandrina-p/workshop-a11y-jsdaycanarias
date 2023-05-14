import Page from "../../exercises/4_animations.solution.jsx";
import { LayoutExercise } from "../../src/components/pageLayouts/LayoutExercise.jsx";

export default Page;

Page.getLayout = function getLayout(page) {
  return <LayoutExercise title="Animations">{page}</LayoutExercise>;
};
