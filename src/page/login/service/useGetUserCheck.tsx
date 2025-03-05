import { useQuery } from "@tanstack/react-query";
import { request } from "../../../config/request";

export const useGetUserCheck = () => {
  return useQuery({
    queryKey: ["user_check"],
    queryFn: () => request.get("/store/profile").then((res) => res.data),
  });
};
