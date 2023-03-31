import Response from "@/domain/entities/Response";
import Quote from "@/domain/entities/Quote";
import IQuoteRepo from "@/domain/repositories/IQuoteRepo";

class DeleteQuoteUseCase {
    private readonly quoteRepo: IQuoteRepo;

    constructor(quoteRepo: IQuoteRepo) {
        this.quoteRepo = quoteRepo;
    }

    async run(id: string, token: string): Promise<Response<Quote>> {
        const response: Response<Quote> = await this.quoteRepo.delete(id, token);
        return response;
    }
}

export default DeleteQuoteUseCase;