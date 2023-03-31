import Quote from "@/domain/entities/Quote";
import Response from "@/domain/entities/Response";
import IQuoteRepo from "@/domain/repositories/IQuoteRepo";

class GetQuoteByIdUseCase {
    private readonly quoteRepo: IQuoteRepo;

    constructor(quoteRepo: IQuoteRepo) {
        this.quoteRepo = quoteRepo;
    }

    async run(id: string, token: string): Promise<Response<Quote>> {
        const response: Response<Quote> = await this.quoteRepo.getOne(id, token);
        return response;
    }
}

export default GetQuoteByIdUseCase;