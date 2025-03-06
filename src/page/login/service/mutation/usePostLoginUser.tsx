import { useMutation } from "@tanstack/react-query";
import { FieldType } from "../../login";
import { request } from "../../../../config/request";

export const usePostLoginUser = () => {
  return useMutation({
    mutationFn: (data: FieldType) =>
      request
        .post("/auth/signin", data)
        .then((res) => res.data)
  });
};
