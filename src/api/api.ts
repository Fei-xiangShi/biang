import http from "./request";
import apiUrl from "@/config/apiConfig";

const Api = {
  receiveCalendar: (ics_url: string) =>
    http.post(apiUrl.ics, { ics_url: ics_url }),
  wxLogin: (code: string, nickName: string, avatarUrl: string) =>{
    http.post(apiUrl.wxLogin, { code: code, username: nickName, avatar_url: avatarUrl })
  }
};

export default Api;
