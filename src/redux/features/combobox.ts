import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type EventsState = {
  comboboxValue: any;
  isConfirm: boolean;
  isComeplete: boolean;
};

const initialState: EventsState = {
  comboboxValue: [],
  isConfirm: false,
  isComeplete: false,
};

export const combobox = createSlice({
  name: "combobox",
  initialState,
  reducers: {
    addCombobox: (state, action: PayloadAction<any>) => {
      const { id } = action.payload;
      const existed = state.comboboxValue?.find((exp: any) => exp.id === id);

      if (!existed) {
        state.comboboxValue.push(action.payload);
      }
    },
    removeCombobox: (state, action: PayloadAction<any>) => {
      const { id } = action.payload;
      state.comboboxValue = state.comboboxValue.filter(
        (exp: any) => exp.id !== id
      );
    },

    clearCombobox: (state) => {
      state.comboboxValue = [];
    },
    isOpenConfirm: (state) => {
      state.isConfirm = true;
    },
    isCloseConfirm: (state) => {
      state.isConfirm = false;
    },
    isDeleteComplete: (state) => {
      state.isComeplete = true;
    },
    isClearComplete: (state) => {
      state.isComeplete = false;
    },
  },
});
export const {
  addCombobox,
  isCloseConfirm,
  isOpenConfirm,
  removeCombobox,
  clearCombobox,
  isDeleteComplete,
  isClearComplete
} = combobox.actions;

export default combobox.reducer;
