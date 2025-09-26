import Stepper from "@/Components/Common/Core/Stepper";
import Create from "./components/Create";
import { useSelector } from "react-redux";
import { RootState } from "@/store/interfaces";
import UploadProject from "./components/UploadProject";

const CreateProjectComponent = () => {
  const { transferStep } = useSelector((state: RootState) => state.root);
  const steps = ["", ""];
  return (
    <>
      <Stepper steps={steps} currentStep={transferStep} />
      {transferStep === 1 && <Create />}
      {transferStep === 2 && <UploadProject />}
    </>
  );
};

export default CreateProjectComponent;
