import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface RequestDebt {
  debt_sum: string;
  debt_name: string;
  debt_date: string;
  debt_period: number;
  description: string;
}

interface updateDebtor {
  id: string | undefined;
  data: RequestDebt;
}

export const useUpdateDebt = () => {
  return useMutation({
    mutationFn: ({ id, data }: updateDebtor) =>
      request.patch(`/debt/${id}`, data).then((res) => res.data),
  });
};
