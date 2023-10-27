import http from "./request";
import apiUrl from "@/config/apiConfig";

const Api = {
  receiveCalendar: (data: object) => {
    http.post(apiUrl.ics, data);
  },
};

export default Api;
