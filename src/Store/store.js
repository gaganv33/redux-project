import accountSlice from "./AccountSlice/accountSlice";
import customerSlice from "./CustomerSlice/customerSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
   reducer: {
      account: accountSlice,
      customer: customerSlice,
   }
})

export default store;
