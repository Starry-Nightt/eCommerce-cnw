import { Author } from "@/models/author.model";
import http from "./http.service";

class AppAuthorService {
  getAllAuthors = (): Promise<Author> => {
    return http.get("/authors");
  };
}

const AuthorService = new AppAuthorService();

export default AuthorService;
