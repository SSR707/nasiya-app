import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { Debtor } from "../../../../utils/interface/dabtorInterface";

interface TotalDebtResponse {
  message: string;
  status_code: number;
  data: {
    total_debt: number;
  };
}

export const useGetDebtorById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["debtor", id],
    queryFn: async () => {
      const debtor = await request
        .get<Debtor>(`debtors/${id}`)
        .then((res) => res.data);
      const formattedDebtor = { ...debtor, debts: debtor.debts ?? [] };
      const total_debts = await request
        .get<TotalDebtResponse>(`debtors/${id}/total-debt`)
        .then((res) => res.data);
      return { debtor: formattedDebtor, total_debts };
    },
    enabled: !!id,
  });
};
