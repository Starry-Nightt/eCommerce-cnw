import { Book } from "@/models/book.model";
import httpTest from "./http.service";
import { Category } from "@/models/category.model";

class AppBookService {
  getAllBook = (queryString?: string): Promise<Book[]> => {
    if (queryString && queryString.length > 0) {
      return httpTest.get(`/books?${queryString}`);
    }
    return httpTest.get("/books");
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
    return httpTest.get(`/books/${bookId}`);
  };
}

const BookService = new AppBookService();

export default BookService;
