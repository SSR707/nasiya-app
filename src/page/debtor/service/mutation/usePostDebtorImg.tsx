import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const usePostDebtorImg = () => {
  return useMutation({
    mutationFn: (img: File) => {
      const formData = new FormData();
      formData.append("file", img);

      return request
        .post("/debtors/images", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
  });
};
