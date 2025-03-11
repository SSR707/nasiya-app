import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useDeleteDebt = () => {
  return useMutation({
    mutationFn: (id: string | undefined) =>
      request.delete(`/debt/${id}`).then((res) => res.data),
  });
};
