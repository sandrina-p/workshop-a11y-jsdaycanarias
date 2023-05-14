import { LayoutExercise } from "../../components/pageLayouts/LayoutExercise.jsx";
import Page from "../../exercises/3_errors.jsx";

export default Page;

Page.getLayout = function getLayout(page) {
  return <LayoutExercise title="Error Handling">{page}</LayoutExercise>;
};
