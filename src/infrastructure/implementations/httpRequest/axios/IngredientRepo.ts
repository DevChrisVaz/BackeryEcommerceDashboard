import axios from "axios";
import Ingredient from "../../../../domain/entities/Ingredient";
import Response from "../../../../domain/entities/Response";
import IIngredientRepo from "../../../../domain/repositories/IIngredientRepo";

class IngredientRepo implements IIngredientRepo {
    private readonly url: string;

    constructor(){ 
        this.url = "http://localhost:5000/api/ingredients/";
    }

    async getAll(): Promise<Response<Ingredient[]>> {
        const response = await axios.get(this.url);
        return response;
    }

    async getOne(id: string): Promise<Response<Ingredient>> {
        const response = await axios.get(this.url + id);
        return response;
    }

    async create(ingredient: Ingredient): Promise<Response<Ingredient>> {
        const response = await axios.post(this.url, ingredient);
        return response;
    }

    async update(id:string, ingredient: Ingredient): Promise<Response<Ingredient>> {
        const response = await axios.put(this.url + id, ingredient);
        return response;
    }

    async delete(id: string): Promise<Response<Ingredient>> {
        const response = await axios.delete(this.url + id);
        return response;
    }
}

export default IngredientRepo;