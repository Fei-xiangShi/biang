import http from "./request";
import apiUrl from "@/config/apiConfig";

const Api = {
  receiveCalendar: (ics_url: string) =>
    http.post(apiUrl.ics, { ics_url: ics_url }),
};

export default Api;
