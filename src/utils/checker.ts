const checkPassword = (password: string): boolean => {
  const regex =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*.+-/\|\\{}[\]=_();:'",<>?~])(?=.{6,20})/;
  return regex.test(password);
};

const checkEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
};

const checkUsername = (username: string): boolean => {
  const regex = /^[\u4e00-\u9fa5a-zA-Z0-9._-]{3,20}$/;
  return regex.test(username);
}

const Checker = {
  checkPassword,
  checkEmail,
  checkUsername,
};

export default Checker;
