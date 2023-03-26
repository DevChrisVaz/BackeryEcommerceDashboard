import axios from "axios";
import Category from "../../../../domain/entities/Category";
import Response from "../../../../domain/entities/Response";
import ICategoryRepo from "../../../../domain/repositories/ICategoryRepo";

class CategoryRepo implements ICategoryRepo {
    private readonly url: string;

    constructor(){ 
        this.url = "http://localhost:5000/api/categories/";
    }

    async getAll(): Promise<Response<Category[]>> {
        const response = await axios.get(this.url);
        return response;
    }

    async getOne(id: string): Promise<Response<Category>> {
        const response = await axios.get(this.url + id);
        return response;
    }

    async create(category: Category): Promise<Response<Category>> {
        const response = await axios.post(this.url, category);
        return response;
    }

    async update(id:string, category: Category): Promise<Response<Category>> {
        const response = await axios.put(this.url + id, category);
        return response;
    }

    async delete(id: string): Promise<Response<Category>> {
        const response = await axios.delete(this.url + id);
        return response;
    }
}

export default CategoryRepo;