import Quote from "../entities/Quote";
import Response from "../entities/Response";

interface IQuoteRepo {
    getAll(): Promise<Response<Quote[]>>;
    getOne(id: string): Promise<Response<Quote>>;
    create(quote: Quote): Promise<Response<Quote>>;
    update(id: string, quote: Quote): Promise<Response<Quote>>;
    delete(id: string): Promise<Response<Quote>>;
}

export default IQuoteRepo;