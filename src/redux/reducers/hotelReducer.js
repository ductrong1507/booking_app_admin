import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../utils/apiConfig";

const initialState = {
  page: 1,
  perPage: 10,
  hotelList: [],
  totalHotel: 0,
  message: "",
};

const hotelReducer = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    getHotelList: (state, action) => {
      state.page = action.payload.page;
      state.perPage = action.payload.perPage;
      state.hotelList = action.payload.result;
      state.totalHotel = action.payload.totalHotel;
    },
    deleteHotelById: (state, action) => {
      alert(action.payload.message);
    },
  },
});

export const { getHotelList, deleteHotelById } = hotelReducer.actions;

export default hotelReducer.reducer;

// Tạo action thunk call API get list Hotel
export const getHotelThunk = (page, perPage) => {
  return async (dispatch) => {
    try {
      const responseApi = await axios({
        url: `${API_BASE_URL}/api/hotel?page=${page}&perPage=${perPage}`,
        method: "GET",
      });
      dispatch(
        getHotelList({
          result: responseApi.data.result,
          page,
          perPage,
          totalHotel: responseApi.data.totalHotel,
        })
      );
    } catch (error) {
      console.log("error", error);
    }
  };
};

// Tạo action thunk call API delete Hotel by ID
export const deleteHotelThunk = (hotelId, page, perPage) => {
  return async (dispatch) => {
    const userInfo =
      JSON.parse(localStorage.getItem("CURRENT_ADMIN_USER")) || {};
    try {
      const responseApi = await axios({
        url: `${API_BASE_URL}/api/hotel/${hotelId}`,
        method: "DELETE",
        headers: {
          isAdmin: userInfo.isAdmin || false,
        },
      });
      dispatch(deleteHotelById(responseApi.data));
      dispatch(getHotelThunk(page, perPage));
    } catch (error) {
      console.log("error", error);
    }
  };
};
