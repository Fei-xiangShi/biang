export class InputContent{
  content: string;
  valid: boolean;
  warning: string;
  constructor(content: string = '') {
    this.content = content;
    this.valid = false;
    this.warning = "";
  }
  checkContent(regex: RegExp, warning: string) {
    this.valid = regex.test(this.content);
    if (!this.valid) {
      this.warning = warning;
    }
  }
  checkContentAll(regex: RegExp, warning: string) {
    this.checkContent(regex, warning);
    return this.valid;
  }
}
