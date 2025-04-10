import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  user: { username: "codeMonster" },
};

const userSlice = createSlice({
  name: "user",
  initialState: defaultState,
  reducers: {
    loginUser: (state, action) => {
      console.log("login user");
    },
    logoutUser: (state) => {
      console.log("logout user");
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
