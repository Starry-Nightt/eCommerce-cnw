import { Book, BookDetailInfo, BookUpdateInfo } from "@/models/book.model";
import httpTest, { http } from "./http.service";
import { Category } from "@/models/category.model";
import { Comment, CommentDetail } from "@/models/comment.model";

class AppBookService {
  getAllBook = (queryString?: string): Promise<any> => {
    if (queryString && queryString.length > 0) {
      return http.get(`/book/allbook?${queryString}`);
    }
    return http.get("/book/allbook");
  };

  getAllCategories = (): Promise<Category[]> => {
    return http.get("/category").then((res) => res.data);
  };

  getBookById = (bookId: String): Promise<BookDetailInfo> => {
    return http.get(`/book/${bookId}`);
  };

  getCommentsOfBook = (bookId: String): Promise<Comment[]> => {
    return httpTest.get(`/comments/${bookId}`);
  };

  deleteBook = (bookId: String): Promise<any> => {
    return http.delete(`/admin/deletebook/${bookId}`);
  };

  createBook = (bookDetail: BookUpdateInfo) => {
    return http.post("/admin/addbook", bookDetail);
  };

  updateBook = (id: string, bookDetail: BookUpdateInfo) => {
    return http.post(`/admin/updatebook/${id}`, bookDetail);
  };

  getCommentOfBook = (bookId: string) => {
    return httpTest.get(`/comments/${bookId}`);
  };

  createCommentBook = (
    bookId: string,
    detail: CommentDetail
  ): Promise<Comment> => {
    return httpTest.post(`/comments/${bookId}`, detail);
  };

  getRatingOfBook = (bookId: string): Promise<number> => {
    return httpTest.get(`/rating/${bookId}`);
  };
}

const BookService = new AppBookService();

export default BookService;
