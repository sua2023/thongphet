import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUsersTypes } from "./../../interfaces/users";

interface UserState {
  data: IUsersTypes | null;
  myData: IUsersTypes | null;
}
const initialState: UserState = {
  data: null,
  myData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setMyData: (state, action: PayloadAction<IUsersTypes>) => {
      state.data = action.payload;
    },
    setData: (state, action: PayloadAction<IUsersTypes>) => {
      state.data = action.payload;
    },
    clearData: (state) => {
      state.data = null;
    },
  },
});

export const { setData, setMyData, clearData } = userSlice.actions;

export default userSlice.reducer;
