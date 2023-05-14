import Page from "../../exercises/2_toggleable.solution.jsx";
import { LayoutExercise } from "../../src/components/pageLayouts/LayoutExercise.jsx";

export default Page;

Page.getLayout = function getLayout(page) {
  return <LayoutExercise title="Toggleable interfaces">{page}</LayoutExercise>;
};
