import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import contestSlice from "./contest/contest.slice";
import walletSlice from "./wallet/wallet.slice";

export const store = configureStore({
  reducer: {
    wallet: walletSlice,
    contest: contestSlice
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false
  })
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
