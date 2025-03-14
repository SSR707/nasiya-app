import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useDeleteDebtImg = () => {
  return useMutation({
    mutationFn: (id: string | undefined) =>
      request.delete(`/debt/image/${id}`).then((res) => res.data),
  });
};
