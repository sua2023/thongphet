"use client";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import dialogReducer from "./features/dialogSlice";
import userReducer from "./features/userSlice";
import patientReducer from "./features/patientSlice";
import eventReducer from "./features/eventSlice";
import approvalReducer from "./features/approvalDoctorSlice";
import comboboxReducer from "./features/combobox";

export const store = configureStore({
  reducer: {
    dialog: dialogReducer,
    user: userReducer,
    events: eventReducer,
    patient: patientReducer,
    approval: approvalReducer,
    combobox: comboboxReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;