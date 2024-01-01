import { Author } from "@/models/author.model";
import httpTest, { http } from "./http.service";

class AppAuthorService {
  getAllAuthors = (): Promise<Author[]> => {
    return http.get("/author").then((res) => res.data);
  };
}

const AuthorService = new AppAuthorService();

export default AuthorService;
