import { configureStore } from "@reduxjs/toolkit";
import debtorReducer from "./slices/debtor-reducer";
import { loadState, saveState } from "../config/storage";
import debtReducer from "./slices/debt-reducer";

export const store = configureStore({
  reducer: {
    debtor: debtorReducer,
    debt: debtReducer,
  },
  preloadedState: {
    debtor: loadState("debtor"),
    debt: loadState("debt"),
  },
});

store.subscribe(() => {
  saveState("debtor", store.getState()?.debtor);
  saveState("debt", store.getState()?.debt);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
