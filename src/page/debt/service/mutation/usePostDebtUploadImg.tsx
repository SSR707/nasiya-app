import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface RequestImg {
  debt_id: string | undefined;
  url: string | undefined;
}
export const usePostDebtUploadImg = () => {
  return useMutation({
    mutationFn: ({ debt_id, url }: RequestImg) =>
      request
        .post(`/debt/image-upload/${debt_id}`, { url })
        .then((res) => res.data),
  });
};
