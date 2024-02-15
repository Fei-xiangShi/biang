
const baseUrl = "https://auproj.3li.top/api";
// api 文档 https://apifox.com/apidoc/shared-4267f6f3-67b7-4f56-8049-a157c20a428a

const apiUrl = {
  // 日历
  ics: `${baseUrl}/ics`,
  // 微信登录
  wxLogin: `${baseUrl}/wxLogin`,
  // 邮箱登录
  emailLogin: `${baseUrl}/emailLogin`,
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
  // 获得用户信息
  user: `${baseUrl}/user`,
  // 评论相关
  comments: `${baseUrl}/comments/`,
  // 邮箱注册
  emailRegister: `${baseUrl}/emailRegister`,
  // 微信注册
  wxRegister: `${baseUrl}/wxRegister`,
  // 检查邮箱是否存在
  emailExists: `${baseUrl}/emailExists`,
  // 修改密码
  setPassword: `${baseUrl}/setPassword`,
  // 头像预签名url获得
  changeAvatar: `${baseUrl}/changeAvatar`,
  // 修改昵称
  changeUsername: `${baseUrl}/changeUsername`,
  // 获得所有Units
  allUnits: `${baseUrl}/allUnits`,
  // 发送通用验证码
  sendEmailVerificationCode: `${baseUrl}/sendEmailVerificationCode`,
  // 验证通用验证码
  codeVertify: `${baseUrl}/codeVertify`,
};

export default apiUrl;
