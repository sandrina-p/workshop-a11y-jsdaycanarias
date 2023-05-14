import Page from "../../exercises/1_routing.jsx";
import { LayoutExercise } from "../../src/components/pageLayouts/LayoutExercise.jsx";

export default Page;

Page.getLayout = function getLayout(page) {
  return <LayoutExercise title="Routing">{page}</LayoutExercise>;
};
