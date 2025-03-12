import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
interface DebtorImageData {
  debtorId: string | undefined;
  url: string;
}

export const usePostDebtorSubmit = () => {
  return useMutation({
    mutationFn: ({ debtorId, url }: DebtorImageData) =>
      request
        .post(`/debtors/${debtorId}/upload-images`, { url })
        .then((res) => res.data),
  });
};
