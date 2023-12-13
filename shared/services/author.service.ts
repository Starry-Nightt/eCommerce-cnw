import { Author } from "@/models/author.model";
import httpTest from "./http.service";

class AppAuthorService {
  getAllAuthors = (): Promise<Author[]> => {
    return httpTest.get("/authors");
  };
}

const AuthorService = new AppAuthorService();

export default AuthorService;
