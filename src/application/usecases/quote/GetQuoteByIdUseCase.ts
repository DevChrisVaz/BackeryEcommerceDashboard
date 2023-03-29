import Quote from "@/domain/entities/Quote";
import Response from "@/domain/entities/Response";
import IQuoteRepo from "@/domain/repositories/IQuoteRepo";

class GetQuoteByIdUseCase {
    private readonly quoteRepo: IQuoteRepo;

    constructor(quoteRepo: IQuoteRepo) {
        this.quoteRepo = quoteRepo;
    }

    async run(id: string): Promise<Response<Quote>> {
        const response: Response<Quote> = await this.quoteRepo.getOne(id);
        return response;
    }
}

export default GetQuoteByIdUseCase;