import httpTest from "./http.service";
import { Publisher } from "@/models/publisher.model";

class AppPublisherService {
  getAllPublishers = (): Promise<Publisher[]> => {
    return httpTest.get("/publishers");
  };
}

const PublisherService = new AppPublisherService();

export default PublisherService;
