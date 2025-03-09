import { createSlice } from "@reduxjs/toolkit";

interface DebtorState {
  debt: {
    debt_sum: string;
    debt_name: string;
    debt_date: string;
    debt_period: string;
    description: string;
    images: string[];
  };
}

const initialState: DebtorState = {
  debt: {
    debt_sum: "",
    debt_name: "",
    debt_date: "",
    debt_period: '',
    description: "",
    images: [],
  },
};
const Debtoeducer = createSlice({
  name: "debt",
  initialState,
  reducers: {
    addDebt: (state, action) => {
      state.debt = { ...state.debt, ...action.payload };
    },
    deleteDebt: (state) => {
      state.debt = initialState.debt;
    },
    deleteDebtImg: (state, action) => {
      state.debt.images = state.debt.images.filter(
        (_, index) => index !== +action.payload
      );
    },
  },
});

export default Debtoeducer.reducer;

export const { addDebt, deleteDebt, deleteDebtImg } = Debtoeducer.actions;
