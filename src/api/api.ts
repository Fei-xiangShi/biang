import http from "./request";
import apiUrl from "@/config/apiConfig";

const Api = {
  receiveCalender: (data: object) => {
    http.post(apiUrl.ics, data);
  },
};

export default Api;
