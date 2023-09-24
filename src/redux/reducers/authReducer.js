import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: JSON.parse(localStorage.getItem("CURRENT_ADMIN_USER"))
    ? true
    : false,
  userLogin: JSON.parse(localStorage.getItem("CURRENT_ADMIN_USER")) || {},
};

const authReducer = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    onLogin: (state, { actionType, payload }) => {
      // lưu vào local Storage
      localStorage.setItem(
        "CURRENT_ADMIN_USER",
        JSON.stringify({
          isLogin: true,
          id: payload.result._id,
          email: payload.result.email,
          userName: payload.result.userName,
          phoneNumber: payload.result.phoneNumber,
          isAdmin: payload.result.isAdmin,
        })
      );

      // set lại reducer Auth
      state.isLogin = true;
      state.userLogin = {
        id: payload.result._id,
        email: payload.result.email,
        userName: payload.result.userName,
        phoneNumber: payload.result.phoneNumber,
        isAdmin: payload.result.isAdmin,
      };
    },

    onLogout: (state) => {
      localStorage.removeItem("CURRENT_ADMIN_USER");
      state.isLogin = false;
      state.userLogin = {};
    },
  },
});

export const { onLogin, onLogout } = authReducer.actions;

export default authReducer.reducer;
