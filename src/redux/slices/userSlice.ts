import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: number;
  fullname: string;
  email: string;
  token: string;
}

const initialState: UserState = {
  id: 0,
  fullname: "",
  email: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.fullname = action.payload.fullname;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logoutAction: (state) => {
      state.id = 0;
      state.fullname = "";
      state.email = "";
      state.token = "";
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;

export default userSlice.reducer;
