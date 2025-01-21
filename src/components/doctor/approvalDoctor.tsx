import { ApprovalDoctorEnum } from "@/enum/doctor.enum";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface IApprovalButtonProps {
  currentStep: number;
}
export default function AprrovalButton({ currentStep }: IApprovalButtonProps) {
  const stepData = useSelector((state: RootState) => state.approval);
  const stepLength = stepData?.stepData.length;
  const allStepsApproved = stepData.stepData.every(
    (step) => step.status == ApprovalDoctorEnum.APPROVED
  );
  if (allStepsApproved) {
    return <>Approval now</>;
  } else if (!allStepsApproved && currentStep === stepLength) {
    return <>Save</>;
  } else {
    return <>Next</>;
  }
}
