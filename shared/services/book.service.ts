import { Book } from "@/models/book.model";
import http from "./http.service";
import { Category } from "@/models/category.model";

class AppBookService {
  getAllBook = (queryString?: string): Promise<Book[]> => {
    if (queryString && queryString.length > 0)
      return http.get(`/books?${queryString}`);
    return http.get("/books");
  };

  getAllCategories = (): Promise<Category> => {
    return http.get("/categories");
  };
}

const BookService = new AppBookService();

export default BookService;
