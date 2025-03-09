import { useQueries } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { Debt } from "../../../../utils/interface/dabtorInterface";

export const useGetDebtsNextPay = (debts: Debt[]) => {
  return useQueries({
    queries: debts.map((debt) => ({
      queryKey: ["debt", debt.id, "next-payment"],
      queryFn: async () => {
        const res = await request.get(`/debt/next-payment/${debt.id}`);
        return res.data;
      },
      enabled: Boolean(debt.id),
    })),
  });
};
