export class Comment {
  id: string;
  userId: string;
  bookId: string;
  name: string;
  content: string;
  score: number;
  user_id: CommentDetail
}

export interface CommentDetail {
  user_id: string;
  name: string;
  content: string;
  score: number;
}
