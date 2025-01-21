import {
  ApprovalDoctorEnum,
  ApprovalDoctorStageEnum,
} from "@/enum/doctor.enum";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IStepData {
  id: string;
  step: number;
  status: ApprovalDoctorEnum;
  description: string | null;
  stages: string;
  label: string;
}

interface IApprovalState {
  stepData: IStepData[];
}

interface IUpdateStepDataPayload {
  id?: string;
  step?: number;
  status?: ApprovalDoctorEnum;
  description?: string | null;
  stages?: string;
  label?: string;
}

const initialState: IApprovalState = {
  stepData: [
    {
      id: "",
      step: 1,
      status: ApprovalDoctorEnum.PENDING,
      description: null,
      stages: ApprovalDoctorStageEnum.PENSONAL,
      label: "Personal",
    },
    {
      id: "",
      step: 2,
      status: ApprovalDoctorEnum.PENDING,
      description: null,
      stages: ApprovalDoctorStageEnum.IDENTITY,
      label: "Identity",
    },
    {
      id: "",
      step: 3,
      status: ApprovalDoctorEnum.PENDING,
      description: null,
      stages: ApprovalDoctorStageEnum.EDUCATION,
      label: "Education",
    },
    {
      id: "",
      step: 4,
      status: ApprovalDoctorEnum.PENDING,
      description: null,
      stages: ApprovalDoctorStageEnum.SPECIALIST,
      label: "Specialist",
    },
    {
      id: "",
      step: 5,
      status: ApprovalDoctorEnum.PENDING,
      description: null,
      stages: ApprovalDoctorStageEnum.EXPERIENCE,
      label: "Experience",
    },
  ],
};

const approvalSlice = createSlice({
  name: "approval",
  initialState,
  reducers: {
    updateStepData(state, action: PayloadAction<IUpdateStepDataPayload>) {
      const { stages, status, description, id } = action.payload;
      const stepIndex = state.stepData.findIndex(
        (step) => step.stages === stages
      );

      if (stepIndex !== -1) {
        const currentStep = state.stepData[stepIndex];

        if (id) currentStep.id = id;
        if (status) currentStep.status = status;
        if (description !== undefined) currentStep.description = description;
      }
    },

    setDescription(
      state,
      action: PayloadAction<{ step: number; message: string | null }>
    ) {
      const { step, message } = action.payload;
      const stepIndex = step - 1;
      if (stepIndex >= 0 && stepIndex < state.stepData.length) {
        state.stepData[stepIndex].description = message;
      }
    },
    setApprovalStatus(
      state,
      action: PayloadAction<{ stepNumber: number; status: ApprovalDoctorEnum }>
    ) {
      const { stepNumber, status } = action.payload;

      const stepToUpdate = state.stepData.find(
        (step) => step.step === stepNumber
      );

      if (stepToUpdate) {
        stepToUpdate.status = status;
      }
    },

    clearState(state) {
      state.stepData = initialState.stepData.map((step) => ({
        ...step,
        status: ApprovalDoctorEnum.PENDING,
        description: null,
      }));
    },
  },
});

export const { setDescription, setApprovalStatus, updateStepData, clearState } =
  approvalSlice.actions;
export default approvalSlice.reducer;
