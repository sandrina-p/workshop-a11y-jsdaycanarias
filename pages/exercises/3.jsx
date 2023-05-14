import Page from "../../exercises/3_errors.jsx";
import { LayoutExercise } from "../../src/components/pageLayouts/LayoutExercise.jsx";

export default Page;

Page.getLayout = function getLayout(page) {
  return <LayoutExercise title="Error Handling">{page}</LayoutExercise>;
};
