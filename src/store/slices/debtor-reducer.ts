import { createSlice } from "@reduxjs/toolkit";

interface DebtorState {
  debtor: {
    id: string;
    full_name: string;
    phone_number: string;
    image: string;
    address: string;
    note: string;
    images: any[];
  };
}

const initialState: DebtorState = {
  debtor: {
    id: "",
    full_name: "",
    phone_number: "",
    image: "",
    address: "",
    note: "",
    images: [],
  },
};
const DebtorReducer = createSlice({
  name: "debtor",
  initialState,
  reducers: {
    addDdebtor: (state, action) => {
      state.debtor = { ...state.debtor, ...action.payload };
    },
    deleteDebtor: (state) => {
      state.debtor = initialState.debtor;
    },
    deleteDebtorImg: (state, action) => {
      state.debtor.images = state.debtor.images.filter(
        (_, index) => index !== +action.payload
      );
    },
  },
});

export default DebtorReducer.reducer;

export const { addDdebtor, deleteDebtor, deleteDebtorImg } =
  DebtorReducer.actions;
