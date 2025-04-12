import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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
      state.user = null;
      localStorage.removeItem('user');
      toast.success('Logout user successfuly');
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
