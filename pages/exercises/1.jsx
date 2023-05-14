import { LayoutExercise } from "../../components/pageLayouts/LayoutExercise.jsx";
import Page from "../../exercises/1_routing.jsx";

export default Page;

Page.getLayout = function getLayout(page) {
  return <LayoutExercise title="Routing">{page}</LayoutExercise>;
};
