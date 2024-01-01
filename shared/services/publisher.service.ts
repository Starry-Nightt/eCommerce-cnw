import httpTest, { http } from "./http.service";
import { Publisher } from "@/models/publisher.model";

class AppPublisherService {
  getAllPublishers = (): Promise<Publisher[]> => {
    return http.get("/nsx").then((res) => res.data);
  };
}

const PublisherService = new AppPublisherService();

export default PublisherService;
