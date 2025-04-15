import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

interface IduePayments {
  id: string;
  debtorName: string;
  amount: string;
}
interface IData {
  totalAmount: number;
  duePayments: IduePayments[];
}
export interface IGetCalendar {
  status_code: number;
  message: string;
  data: IData;
}

export const useGetCalendar = (deta: string) => {
  return useQuery({
    queryKey: ["calendar_date", deta],
    queryFn: () =>
      request
        .get<IGetCalendar>(`store-statistics/calendar?date=${deta}`)
        .then((res) => res.data),
  });
};
