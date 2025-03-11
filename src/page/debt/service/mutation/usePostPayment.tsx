import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
interface RequestPayment {
  debt_id: string | undefined;
  sum: number | undefined;
  type: string;
  date: string;
}
export const usePostPayment = () => {
  return useMutation({
    mutationFn: (data: RequestPayment) =>
      request.post("/payments", data).then((res) => res.data),
  });
};
