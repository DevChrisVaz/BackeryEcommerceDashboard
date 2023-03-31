import axios from "axios";
import Category from "../../../../domain/entities/Category";
import Response from "../../../../domain/entities/Response";
import ICategoryRepo from "../../../../domain/repositories/ICategoryRepo";
// import dotenv from "dotenv";

// dotenv.config();

class CategoryRepo implements ICategoryRepo {
    private readonly url: string;

    constructor(){ 
        this.url = process.env.API_URL + "categories/";
    }

    async getAll(): Promise<Response<Category[]>> {
        const response = await axios.get(this.url);
        return response;
    }

    async getOne(id: string): Promise<Response<Category>> {
        const response = await axios.get(this.url + id);
        return response;
    }

    async create(category: Category, token: string): Promise<Response<Category>> {
        const response = await axios.post(this.url, category, {
            headers: {
                Authorization: "bearer " + token
            }
        });
        return response;
    }

    async update(id:string, category: Category, token: string): Promise<Response<Category>> {
        const response = await axios.put(this.url + id, category, {
            headers: {
                Authorization: "bearer " + token
            }
        });
        return response;
    }

    async delete(id: string, token: string): Promise<Response<Category>> {
        const response = await axios.delete(this.url + id, {
            headers: {
                Authorization: "bearer " + token
            }
        });
        return response;
    }
}

export default CategoryRepo;