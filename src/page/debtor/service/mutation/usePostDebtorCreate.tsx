import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { DebtorI } from "../../debtorAdd";

export const usePostDebtorCreate = () => {
  return useMutation({
    mutationFn: (data: DebtorI) =>
      request.post("/debtors", data).then((res) => res.data),
  });
};
