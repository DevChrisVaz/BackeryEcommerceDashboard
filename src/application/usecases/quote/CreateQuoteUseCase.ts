import QuoteErrors from "@/domain/entities/errors/QuoteErrors";
import Quote from "@/domain/entities/Quote";
import Response from "@/domain/entities/Response";
import CreateQuoteException from "@/domain/exceptions/quote-exceptions/CreateCategoryException";
import IQuoteRepo from "@/domain/repositories/IQuoteRepo";
import IQuoteValidationsRepo from "@/domain/repositories/validations/IQuoteValidationsRepo";

class CreateQuoteUseCase {
    private readonly quoteRepo: IQuoteRepo;
    private readonly quoteValidationsRepo: IQuoteValidationsRepo;

    constructor(
        quoteRepo: IQuoteRepo,
        quoteValidationRepo: IQuoteValidationsRepo
    ) {
        this.quoteRepo = quoteRepo;
        this.quoteValidationsRepo = quoteValidationRepo
    }

    async run(quote: Quote): Promise<Response<Quote>> {
        const errors: QuoteErrors | null = await this.quoteValidationsRepo.create(quote);
        if(errors) throw new CreateQuoteException(errors);
        const response: Response<Quote> = await this.quoteRepo.create(quote);
        return response;
    }
}

export default CreateQuoteUseCase;