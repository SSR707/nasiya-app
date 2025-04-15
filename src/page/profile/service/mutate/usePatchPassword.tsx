import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const usePatchPassword = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      request.patch(`/auth/update-password/${id}`, data).then((res) => res.data),
  });
};
