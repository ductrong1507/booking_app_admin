import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import transactionReducer from "./reducers/transactionReducer";
import hotelReducer from "./reducers/hotelReducer";
import roomReducer from "./reducers/roomReducer";
import userReducer from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    authReducer,
    transactionReducer,
    hotelReducer,
    roomReducer,
    userReducer,
  },
});
