import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IEventExpertise {
  id?: string;
  name: string;
}

interface IEventEducation {
  year: string;
  university: string;
  from: string;
  to: string;
}

interface EventsState {
  education: IEventEducation[];
  expertise: IEventExpertise[];
}
const initialState: EventsState = {
  education: [],
  expertise: [],
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEducation: (state, action: PayloadAction<IEventEducation>) => {
      state.education.push(action.payload);
    },
    removeEducation: (state, action: PayloadAction<number>) => {
      state.education = state.education.filter(
        (_, index) => index !== action.payload
      );
    },
    setEducation: (state, action: PayloadAction<IEventEducation[]>) => {
      state.education = action.payload;
    },
    addExpertise: (state, action: PayloadAction<IEventExpertise>) => {
      const { id } = action.payload;
      const existingExpertise = state.expertise?.find((exp) => exp.id === id);
      if (!existingExpertise) {
        state.expertise.push(action.payload);
      }
    },
    removeExpertise: (state, action: PayloadAction<number>) => {
      state.expertise = state.expertise.filter(
        (_, index) => index !== action.payload
      );
    },
    setExpertise: (state, action: PayloadAction<IEventExpertise[]>) => {
      state.expertise = action.payload;
    },
    clearExpertise: (state) => {
      state.expertise = [];
    },
    clearEducation: (state) => {
      state.education = [];
    },
  },
});

export const {
  addEducation,
  removeEducation,
  setEducation,
  addExpertise,
  removeExpertise,
  setExpertise,
  clearEducation,
  clearExpertise,
} = eventsSlice.actions;

export default eventsSlice.reducer;
