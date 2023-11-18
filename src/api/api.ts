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
  getCourseDetail: (course_code: string, unit_code: string, lang: string) =>
    http.post(apiUrl.getCourseDetail, {
      course_code: course_code,
      unit_code: unit_code,
      lang: lang,
    }),
  sendEmail: (to_address: string, auedu_session: string, lang: string) =>
    http.post(apiUrl.sendEmail, {
      to_address: to_address,
      auedu_session: auedu_session,
      lang: lang,
    }),
  verifyEmail: (auedu_session: string, email_verification_code: string) =>
    http.post(apiUrl.verifyEmail, {
      auedu_session: auedu_session,
      email_verification_code: email_verification_code,
    }),
  getUnits: (course_code: string) =>
    http.post(apiUrl.getUnits, {
      course_code: course_code,
    }),
  notices: () => http.get(apiUrl.notices),
  addNotice: (
    zh_Hans: string,
    zh_Hant: string,
    en: string,
    auedu_session: string,
    date: string
  ) =>
    http.post(apiUrl.notices, {
      zh_Hans: zh_Hans,
      zh_Hant: zh_Hant,
      en: en,
      auedu_session: auedu_session,
      fxsd6: "1235d6",
      date: date,
    }),
  deleteNotice: (id: number, auedu_session: string) =>
    http.del(apiUrl.notices + id + "/", {
      auedu_session: auedu_session,
      fxsd6: "1235d6",
    }),
  modifyNotice: (
    zh_Hans: string,
    zh_Hant: string,
    en: string,
    auedu_session: string,
    date: string,
    id: number
  ) =>
    http.put(apiUrl.notices + id + "/", {
      zh_Hans: zh_Hans,
      zh_Hant: zh_Hant,
      en: en,
      auedu_session: auedu_session,
      fxsd6: "1235d6",
      date: date,
    }),
};

export default Api;
