import axios from "axios";
import Quote from "../../../../domain/entities/Quote";
import Response from "../../../../domain/entities/Response";
import IQuoteRepo from "../../../../domain/repositories/IQuoteRepo";

class QuoteRepo implements IQuoteRepo {
    private readonly url: string;

    constructor(){ 
        this.url = process.env.API_URL + "quotes/";
    }

    async getAll(): Promise<Response<Quote[]>> {
        const response = await axios.get(this.url);
        return response;
    }

    async getOne(id: string): Promise<Response<Quote>> {
        const response = await axios.get(this.url + id);
        return response;
    }

    async create(quote: Quote): Promise<Response<Quote>> {
        const response = await axios.post(this.url, quote);
        return response;
    }

    async update(id:string, quote: Quote): Promise<Response<Quote>> {
        const response = await axios.put(this.url + id, quote);
        return response;
    }

    async delete(id: string): Promise<Response<Quote>> {
        const response = await axios.delete(this.url + id);
        return response;
    }
}

export default QuoteRepo;