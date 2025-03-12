import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useDeleteDebtorImg = () => {
  return useMutation({
    mutationFn: (id: string | undefined) =>
      request.delete(`/debtors/delete_img/${id}`).then((res) => res.data),
  });
};
