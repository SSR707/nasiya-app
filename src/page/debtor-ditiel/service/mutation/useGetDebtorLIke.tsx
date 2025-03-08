import { useMutation } from "@tanstack/react-query";

import { request } from "../../../../config/request";

export const useGetDebtorLIke = () => {
  return useMutation({
    mutationFn: (id: string | undefined) =>
      request.post(`/likes/toggleLike/${id}`).then((res) => res.data),
  });
};
