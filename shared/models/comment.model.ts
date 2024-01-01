export class Comment {
  id: string;
  userId: string;
  bookId: string;
  name: string;
  body: string;
  score: number;
}

export interface CommentDetail {
  userId: string;
  name: string;
  body: string;
  score: number;
}
