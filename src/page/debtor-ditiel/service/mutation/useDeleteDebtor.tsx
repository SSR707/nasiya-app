import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useDeleteDebtor = () => {
  return useMutation({
    mutationFn: (id: string | undefined) => {
      return request.delete(`/debtors/${id}`).then((res) => res.data);
    },
  });
};
