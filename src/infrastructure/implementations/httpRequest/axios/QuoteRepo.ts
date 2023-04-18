import axios from "axios";
import Quote from "../../../../domain/entities/Quote";
import Response from "../../../../domain/entities/Response";
import IQuoteRepo from "../../../../domain/repositories/IQuoteRepo";

axios.defaults.withCredentials = true;

class QuoteRepo implements IQuoteRepo {
    private readonly url: string;

    constructor(){ 
        this.url = process.env.API_URL + "quotes/";
    }

    async getAll(token: string): Promise<Response<Quote[]>> {
        const response = await axios.get(this.url, {
            headers: {
                Authorization: "bearer " + token
            }
        });
        return response;
    }

    async getOne(id: string, token: string): Promise<Response<Quote>> {
        const response = await axios.get(this.url + id, {
            headers: {
                Authorization: "bearer " + token
            }
        });
        return response;
    }

    async create(quote: Quote): Promise<Response<Quote>> {
        const response = await axios.post(this.url, quote);
        return response;
    }

    async update(id:string, quote: Quote, token: string): Promise<Response<Quote>> {
        const response = await axios.put(this.url + id, quote, {
            headers: {
                Authorization: "bearer " + token
            }
        });
        return response;
    }

    async delete(id: string, token: string): Promise<Response<Quote>> {
        const response = await axios.delete(this.url + id, {
            headers: {
                Authorization: "bearer " + token
            }
        });
        return response;
    }
}

export default QuoteRepo;