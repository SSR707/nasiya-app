import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { ApiResponseStoreDebtors } from "../../../../utils/interface/dabtorInterface";

export const useGetAllDebtors = (searchQuery?: string) => {
  return useQuery({
    queryKey: ["debtors", searchQuery],
    queryFn: () =>
      request
        .get<ApiResponseStoreDebtors>("/store/store-debtors", {
          params: { fullname: searchQuery },
        })
        .then((res) => res.data),
  });
};
