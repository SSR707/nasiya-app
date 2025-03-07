export interface Debtor {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  phone_number: string;
  image: string;
  address: string;
  note: string;
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
