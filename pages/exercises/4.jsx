import { LayoutExercise } from "../../components/pageLayouts/LayoutExercise.jsx";
import Page from "../../exercises/4_animations.jsx";

export default Page;

Page.getLayout = function getLayout(page) {
  return <LayoutExercise title="Animations">{page}</LayoutExercise>;
};
