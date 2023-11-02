import http from "./request";
import apiUrl from "@/config/apiConfig";

const Api = {
  receiveCalendar: (ics_url: string) =>
    http.post(apiUrl.ics, { ics_url: ics_url }),
  wxLogin: (code: string, nickName: string) =>
    http.post(apiUrl.wxLogin, {
      code: code,
      username: nickName,
    }),
  getProgramList: () => http.get(apiUrl.getProgramList),
  uploadAvatar: (avatarUrl: string, aueduSession: string) =>
    uni.uploadFile({
      url: apiUrl.uploadAvatar,
      filePath: avatarUrl,
      name: "avatar",
      formData: {
        aueduSession: aueduSession,
      },
    }),
};

export default Api;
