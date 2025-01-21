import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface dialogValue {
  isOpen: boolean;
  status: string;
  dataEvents: any;
}

const initialState: dialogValue = {
  isOpen: false,
  status: "",
  dataEvents: null,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<dialogValue>) => {
      state.isOpen = action.payload.isOpen;
      state.status = action.payload.status;
      state.dataEvents = action.payload.dataEvents;
    },
    closeOpen: (state) => {
      state.isOpen = false;
      state.status = "";
      state.dataEvents = null;
    },
  },
});

export const { setIsOpen, closeOpen } = dialogSlice.actions;
export default dialogSlice.reducer;
