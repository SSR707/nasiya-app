import { useQueries } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useGetDebtsNextPay = (debts: { id: string }[]) => {
  return useQueries({
    queries: debts.map((debt) => ({
      queryKey: ["debt", debt.id, "next-payment"],
      queryFn: () =>
        request.get(`/debt/${debt.id}/next-payment`).then((res) => res.data),
      enabled: !!debt.id,
    })),
  });
};
