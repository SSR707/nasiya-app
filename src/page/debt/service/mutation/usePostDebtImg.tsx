import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const usePostDebtImg = () => {
  return useMutation({
    mutationFn: (img: File) => {
      const formData = new FormData();
      formData.append("file", img);
      return request
        .post("/debt/upload-imag", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
  });
};
