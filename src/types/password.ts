export class Password {
  content: string;
  again: string;
  letter: boolean;
  number: boolean;
  symbol: boolean;
  length: boolean;
  letterWarning: string = "密码必须包含字母";
  numberWarning: string = "密码必须包含数字";
  symbolWarning: string = "密码必须包含特殊字符";
  lengthWarning: string = "密码长度必须在6-20位之间";
  constructor(content: string = "") {
    this.content = content;
    this.again = "";
    this.letter = false;
    this.number = false;
    this.symbol = false;
    this.length = false;
  }
  checkPassword() {
    const regexForLetter = /^(?=.*[a-zA-Z])/;
    const regexForNumber = /^(?=.*[0-9])/;
    const regexForSymbol = /^(?=.*[!@#$%^&*.+-/\|\\{}[\]=_();:'",<>?~])/;
    const regexForLength =
      /^[a-zA-Z0-9!@#$%^&*.+-/\|\\{}[\]=_();:'",<>?~]{6,20}$/;
    this.letter = regexForLetter.test(this.content);
    this.number = regexForNumber.test(this.content);
    this.symbol = regexForSymbol.test(this.content);
    this.length = regexForLength.test(this.content);
  }
  checkPasswordAll() {
    this.checkPassword();
    let cnt = 0;
    if (this.letter) {
      cnt++;
    }
    if (this.number) {
      cnt++;
    }
    if (this.symbol) {
      cnt++;
    }
    if (!this.length) {
      cnt = 0;
    }
    return cnt >= 2;
  }
  checkPasswordAgain() {
    return this.content === this.again;
  }
}
