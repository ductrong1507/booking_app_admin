import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../utils/apiConfig";

const initialState = {
  page: 1,
  perPage: 10,
  transactionList: [],
  totalTransaction: 0,
  totalAmount: 0,
};

const transactionReducer = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    getTransactionList: (state, action) => {
      state.page = action.payload.page;
      state.perPage = action.payload.perPage;
      state.transactionList = action.payload.result;
      state.totalTransaction = action.payload.totalTransaction;
      state.totalAmount = action.payload.totalAmount;
    },
  },
});

export const { getTransactionList } = transactionReducer.actions;

export default transactionReducer.reducer;

// Action thunk call API
export const getTransactionThunk = (page, perPage) => {
  return async (dispatch) => {
    try {
      const responseApi = await axios({
        url: `${API_BASE_URL}/api/transaction?page=${page}&perPage=${perPage}`,
        method: "GET",
      });
      dispatch(
        getTransactionList({
          result: responseApi.data.result,
          page,
          perPage,
          totalTransaction: responseApi.data.totalTransaction,
          totalAmount: responseApi.data.totalAmount,
        })
      );
    } catch (error) {
      console.log("error", error);
    }
  };
};
