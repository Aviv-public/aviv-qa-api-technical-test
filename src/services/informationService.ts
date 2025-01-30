import { Information } from '../models/information';

class InformationService {
    private information: Information[] = [];

    public getApiInformation(): Information {
        return {
            message: "Welcome to Book Management API",
            endpoints: {
                books: "/api/books",
                health: "/api/health"
            }
        };
    }
}

export default InformationService;
