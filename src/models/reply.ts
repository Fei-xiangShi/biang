import User from "./userInfo";

interface ReplyContent {
  "zh-Hans": string;
  en: string;
}

export default class Reply {
  id: number = 0;
  user: User = new User();
  course: string = "";
  lang: string = "";
  content: ReplyContent = {
    "zh-Hans": "",
    en: "",
  };
  likes: number = 0;
  createAt: string = "";
  updateAt: string = "";
  parent: string | null = null;
  replies: Reply[] = [];
}
