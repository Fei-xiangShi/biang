import type Reply from './reply';

export default class ReplyList {
  count: number = 0;
  next: string | null = null;
  previous: string | null = null;
  results: Reply[] = [];
  page: number = 1;
}
