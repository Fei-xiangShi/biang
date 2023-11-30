const checkPassword = (
  password: string
): [boolean, boolean, boolean, boolean] => {
  const regexForLetter = /^(?=.*[a-zA-Z])/;
  const regexForNumber = /^(?=.*[0-9])/;
  const regexForSymbol = /^(?=.*[!@#$%^&*.+-/\|\\{}[\]=_();:'",<>?~])/;
  const regexForLength =
    /^[a-zA-Z0-9!@#$%^&*.+-/\|\\{}[\]=_();:'",<>?~]{6,20}$/;
  return [
    regexForLetter.test(password),
    regexForNumber.test(password),
    regexForSymbol.test(password),
    regexForLength.test(password),
  ];
};

const checkEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
};

const checkUsername = (username: string): boolean => {
  const regex = /^[\u4e00-\u9fa5a-zA-Z0-9._-]{3,20}$/;
  return regex.test(username);
};

const Checker = {
  checkPassword,
  checkEmail,
  checkUsername,
};

export default Checker;
