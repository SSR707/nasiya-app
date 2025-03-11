import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useGetDebtById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["debt", id],
    queryFn: () => request.get(`/debt/${id}`).then((res) => res.data),
  });
};
