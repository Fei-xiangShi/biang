interface Reply {
  id: number;
  passageId: number;
  author: Object;
  content: string;
  gmtCreate: number;
  isDelete: boolean;
  rootReplyId: number;
  parentReplyId: number;
  replyList: ReplyList;
}

export default class ReplyList {
  list: Reply[] = [];
  page: number = 1;
}
