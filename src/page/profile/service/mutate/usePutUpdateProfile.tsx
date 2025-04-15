import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const usePutUpdateProfile = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      request.patch(`/store/${id}`, data).then((res) => res.data)
  });
};
