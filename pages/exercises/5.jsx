import Page from "../../exercises/5_final.jsx";
import { LayoutExercise } from "../../src/components/pageLayouts/LayoutExercise.jsx";

export default Page;

Page.getLayout = function getLayout(page) {
  return <LayoutExercise title="All together now">{page}</LayoutExercise>;
};
