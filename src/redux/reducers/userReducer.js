import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../utils/apiConfig";

const initialState = {
  page: 1,
  perPage: 10,
  userList: [],
  totalUser: 0,
  message: "",
};

const userReducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUserList: (state, action) => {
      state.page = action.payload.page;
      state.perPage = action.payload.perPage;
      state.userList = action.payload.result;
      state.totalUser = action.payload.totalUser;
    },
  },
});

export const { getUserList } = userReducer.actions;

export default userReducer.reducer;

// Tạo action thunk call API get list Users
export const getUserThunk = (page, perPage) => {
  return async (dispatch) => {
    try {
      const responseApi = await axios({
        url: `${API_BASE_URL}/api/user?page=${page}&perPage=${perPage}`,
        method: "GET",
      });
      dispatch(
        getUserList({
          result: responseApi.data.result,
          page,
          perPage,
          totalUser: responseApi.data.totalUser,
        })
      );
    } catch (error) {
      console.log("error", error);
    }
  };
};
