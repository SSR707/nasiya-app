import { configureStore } from "@reduxjs/toolkit";
import debtorReducer from "./slices/debtor-reducer";
import { loadState, saveState } from "../config/storage";

export const store = configureStore({
  reducer: {
    debtor: debtorReducer,
  },
  preloadedState: {
    debtor: loadState("debtor"),
  },
});

store.subscribe(() => {
  saveState("debtor", store.getState()?.debtor);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
