const baseUrl = "https://auproj.3li.top/api";
// api 文档 https://apifox.com/apidoc/shared-4267f6f3-67b7-4f56-8049-a157c20a428a

const apiUrl = {
  // 日历
  ics: `${baseUrl}/ics`,
  // 微信登录
  wxLogin: `${baseUrl}/wxLogin`,
  // 获取项目列表
  getProgramList: `${baseUrl}/getProgramList`,
  // 上传头像
  uploadAvatar: `${baseUrl}/uploadAvatar`,
  // 课程详情
  getCourseDetail: `${baseUrl}/getCourseDetail`,
  // 发送邮箱验证码
  sendEmail: `${baseUrl}/sendEmail`,
  // 验证邮箱验证码
  verifyEmail: `${baseUrl}/verifyEmail`,
  // 根据课程号获得单元号
  getUnits: `${baseUrl}/getUnits`,
  // 获得滚动公告
  notices: `${baseUrl}/notices/`,
};

export default apiUrl;
