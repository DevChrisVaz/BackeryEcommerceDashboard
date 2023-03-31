import Quote from "../entities/Quote";
import Response from "../entities/Response";

interface IQuoteRepo {
    getAll(token: string): Promise<Response<Quote[]>>;
    getOne(id: string, token: string): Promise<Response<Quote>>;
    create(quote: Quote): Promise<Response<Quote>>;
    update(id: string, quote: Quote, token: string): Promise<Response<Quote>>;
    delete(id: string, token: string): Promise<Response<Quote>>;
}

export default IQuoteRepo;