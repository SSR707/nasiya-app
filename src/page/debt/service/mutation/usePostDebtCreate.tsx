import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface RequestDebt {
  debt_sum: string;
  debt_name: string;
  debt_date: string;
  debt_period: number;
  description: string;
  debtor_id: string | undefined;
}

export const usePostDebtCreate = () => {
  return useMutation({
    mutationFn: (data: RequestDebt) =>
      request.post(`/debt`, data).then((res) => res.data),
  });
};
