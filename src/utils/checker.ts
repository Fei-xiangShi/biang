import type { InputContent } from "@/types/inputContent";

export const checkEmail = (email: InputContent) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  email.checkContent(regex, "邮箱格式错误");
};

export const checkUsername = (username: InputContent) => {
  const regex = /^[\u4e00-\u9fa5a-zA-Z0-9._-]{3,20}$/;
  username.checkContent(regex, "用户名格式错误");
};
