import { Book } from "@/models/book.model";
import httpTest, { http } from "./http.service";
import { Category } from "@/models/category.model";

class AppBookService {
  getAllBook = (queryString?: string): Promise<any> => {
    if (queryString && queryString.length > 0) {
      return http.get(`/book/allbook?${queryString}`);
    }
    return http.get("/book/allbook");
  };

  getAllCategories = (): Promise<Category[]> => {
    return httpTest.get("/categories");
  };

  getBookByCategory = (categoryId: String): Promise<Book[]> => {
    return httpTest.get(`/books/category/${categoryId}`);
  };

  getBookByAuthor = (authorId: String): Promise<Book[]> => {
    return httpTest.get(`/books/author/${authorId}`);
  };

  getBookByPublisher = (publisherId: String): Promise<Book[]> => {
    return httpTest.get(`/books/publisher/${publisherId}`);
  };

  getBookById = (bookId: String): Promise<Book> => {
    return http.get(`/book/${bookId}`);
  };

  getCommentsOfBook = (bookId: String): Promise<Comment[]> => {
    return httpTest.get(`/comments/${bookId}`);
  };
}

const BookService = new AppBookService();

export default BookService;
