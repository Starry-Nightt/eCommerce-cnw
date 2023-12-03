import { Book } from "@/models/book.model";
import http from "./http.service";
import { Category } from "@/models/category.model";

class AppBookService {
  getAllBook = (queryString?: string): Promise<Book[]> => {
    if (queryString && queryString.length > 0)
      return http.get(`/books?${queryString}`);
    return http.get("/books");
  };

  getAllCategories = (): Promise<Category[]> => {
    return http.get("/categories");
  };

  getBookByCategory = (categoryId: String): Promise<Book[]> => {
    return http.get(`/books/category/${categoryId}`);
  };

  getBookByAuthor = (authorId: String): Promise<Book[]> => {
    return http.get(`/books/author/${authorId}`);
  };

  getBookByPublisher = (publisherId: String): Promise<Book[]> => {
    return http.get(`/books/publisher/${publisherId}`);
  };

  getBookById = (bookId: String): Promise<Book> => {
    return http.get(`/books/${bookId}`);
  };
}

const BookService = new AppBookService();

export default BookService;
