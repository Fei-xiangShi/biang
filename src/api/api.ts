import http from "./request";
import apiUrl from "@/config/apiConfig";

const Api = {
  receiveCalendar: (ics_url: string, auedu_session: string) =>
    http.post(apiUrl.ics, { ics_url: ics_url, auedu_session: auedu_session }),
  wxLogin: (code: string) =>
    http.post(apiUrl.wxLogin, {
      code: code,
    }),
  emailLogin: (email: string, password: string) =>
    http.post(apiUrl.emailLogin, {
      email: email,
      password: password,
    }),
  getProgramList: (university_id: string) =>
    http.get(apiUrl.getProgramList + "?university_id=" + university_id),
  uploadAvatar: (
    url: string,
    avatarData: string | ArrayBuffer,
    header: object
  ) => http.put(url, avatarData, header),
  updateAvatarUrl: (avatarUrl: string, aueduSession: string) =>
    http.post(apiUrl.uploadAvatar, {
      avatar_url: avatarUrl,
      auedu_session: aueduSession,
    }),
  getCourseDetail: (
    course_code: string,
    unit_code: string,
    lang: string,
    university_id: number
  ) =>
    http.post(apiUrl.getCourseDetail, {
      course_code: course_code,
      unit_code: unit_code,
      lang: lang,
      university_id: university_id,
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
  getUnits: (course_code: string, university_id: number) =>
    http.post(apiUrl.getUnits, {
      course_code: course_code,
      university_id: university_id,
    }),
  notices: () => http.get(apiUrl.notices + "?mode=current"),
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
  notice: (id: number) => http.get(apiUrl.notices + id + "/"),
  allNotices: () => http.get(apiUrl.notices + "?mode=all"),
  getUser: (auedu_session: string) => http.post(apiUrl.user, { auedu_session }),
  getComments: (university_id: number, course_code: string, page: number) =>
    http.get(
      `${apiUrl.comments}university/${university_id}/${course_code}/?page=${page}`
    ),
  postComment: (auedu_session: string, comment: object) =>
    http.post(apiUrl.comments, {
      auedu_session: auedu_session,
      comment: comment,
    }),
  deleteComment: (id: number, auedu_session: string) =>
    http.del(`${apiUrl.comments}${id}/`, { auedu_session: auedu_session }),
  emailRegister: (
    email: string,
    username: string,
    password: string,
    university: string,
    avatarSize: string
  ) =>
    http.post(apiUrl.emailRegister, {
      email: email,
      username: username,
      password: password,
      university: university,
      avatar_size: avatarSize,
    }),
  wxRegister: (
    code: string,
    username: string,
    university: string,
    avatarSize: string,
    email?: undefined | string
  ) =>
    http.post(apiUrl.wxRegister, {
      code: code,
      username: username,
      university: university,
      size: avatarSize,
      email: email,
    }),
};

export default Api;
