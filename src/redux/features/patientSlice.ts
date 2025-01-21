import { IPatienTypes } from "@/interfaces/patients";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PatientState {
  data: IPatienTypes | null;
}
const initialState: PatientState = {
  data: null,
};

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IPatienTypes>) => {
      console.log(action);
      
      state.data = action.payload;
    },
    clearData: (state) => {
      state.data = null;
    },
  },
});

export const { setData, clearData } = patientSlice.actions;

export default patientSlice.reducer;
