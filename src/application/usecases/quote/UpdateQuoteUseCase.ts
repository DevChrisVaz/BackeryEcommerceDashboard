import Response from "@/domain/entities/Response";
import Quote from "@/domain/entities/Quote";
import IQuoteRepo from "@/domain/repositories/IQuoteRepo";

class UpdateQuoteUseCase {
    private readonly quoteRepo: IQuoteRepo;

    constructor(quoteRepo: IQuoteRepo) {
        this.quoteRepo = quoteRepo;
    }

    async run(id: string, quote: Quote): Promise<Response<Quote>> {
        const response: Response<Quote> = await this.quoteRepo.update(id, quote);
        return response;
    }
}

export default UpdateQuoteUseCase;