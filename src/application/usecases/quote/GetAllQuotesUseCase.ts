import Response from "@/domain/entities/Response";
import Quote from "@/domain/entities/Quote";
import IQuoteRepo from "@/domain/repositories/IQuoteRepo";

class GetAllQuotesUseCase {
    private readonly quoteRepo: IQuoteRepo;

    constructor(quoteRepo: IQuoteRepo) {
        this.quoteRepo = quoteRepo;
    }

    async run(token: string): Promise<Response<Quote[]>> {
        let response: Response<Quote[]> = await this.quoteRepo.getAll(token);
        return response;
    }
}

export default GetAllQuotesUseCase;