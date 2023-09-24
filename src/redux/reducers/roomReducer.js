import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../utils/apiConfig";

const initialState = {
  page: 1,
  perPage: 10,
  roomList: [],
  totalRoom: 0,
  message: "",
};

const roomReducer = createSlice({
  name: "room",
  initialState,
  reducers: {
    getRoomList: (state, action) => {
      state.roomList = action.payload.result;
      state.page = action.payload.page;
      state.perPage = action.payload.perPage;
      state.totalRoom = action.payload.totalRoom;
    },
  },
});

export const { getRoomList } = roomReducer.actions;

export default roomReducer.reducer;

// Tạo action thunk call API get list Room
export const getRoomThunk = (page, perPage) => {
  return async (dispatch) => {
    try {
      const responseApi = await axios({
        url: `${API_BASE_URL}/api/room?page=${page}&perPage=${perPage}`,
        method: "GET",
      });
      dispatch(
        getRoomList({
          result: responseApi.data.result,
          page,
          perPage,
          totalRoom: responseApi.data.totalRoom,
        })
      );
    } catch (error) {
      console.log("error", error);
    }
  };
};
