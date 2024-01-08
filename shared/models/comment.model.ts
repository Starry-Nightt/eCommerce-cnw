export class Comment {
  id: string;
  userId: string;
  bookId: string;
  name: string;
  content: string;
  score: number;
  user_id: UserComment;
}

export interface CommentDetail {
  _id: string;
  name: string;
  content: string;
  score: number;
}

export interface UserComment {
  _id?: string;
  name: string;
}
