export interface Debt {
  id: string;
  debtor_id: string;
  debt_sum: string;
  debt_name: string;
  month_sum: 0;
  debt_date: string;
  debt_period: number;
  description: string;
  created_at: number;
  updated_at: number;
  payment: [];
  images: [];
}

interface DebtorImages {
  image: string ,
  id: string
}

export interface Debtor {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  phone_number: string;
  image: string;
  address: string;
  note: string;
  images?: DebtorImages[] | undefined;
  likes?: string[];
  debts?: Debt[];
  store_id: string;
  is_active: boolean;
}

export interface StoreOwner {
  id: string;
  created_at: string;
  updated_at: string;
  fullname: string;
  image: string;
  email: string;
  phone_number: string;
  debtors: Debtor[];
}

export interface ApiResponseStoreDebtors {
  status_code: number;
  message: string;
  data: StoreOwner;
}
