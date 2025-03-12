import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export interface Debtor {
    full_name: string;
    phone_number: string;
    address: string;
    note: string
  }

interface updateDebtor {
  id: string | undefined;
  data: Debtor
}

export const useUpdateDebtor = () => {
  return useMutation({
    mutationFn: ({ id, data }:updateDebtor) =>
      request.patch(`/debtors/${id}` , data).then((res) => res.data),
  });
};
