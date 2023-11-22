import User from "./userInfo";

export default class Reply {
  id: number = 0;
  passageId: number = 0;
  author: User = new User();
  content: string = "";
  gmtCreate: number = 0;
  isDelete: boolean = false;
  rootReplyId: number | null = null;
  parentReplyId: number | null = null;
}
