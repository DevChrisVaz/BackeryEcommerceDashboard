import QuoteErrors from "@/domain/entities/errors/QuoteErrors";
import Quote from "@/domain/entities/Quote";

interface IQuoteValidationsRepo {
    create(quote: Quote): Promise<QuoteErrors | null>;
}

export default IQuoteValidationsRepo;