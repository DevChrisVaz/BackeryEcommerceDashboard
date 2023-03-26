import Ingredient from "../entities/Ingredient";
import Response from "../entities/Response";

interface IIngredientRepo {
    getAll(): Promise<Response<Ingredient[]>>;
    getOne(id: string): Promise<Response<Ingredient>>;
    create(ingredient: Ingredient): Promise<Response<Ingredient>>;
    update(id: string, ingredient: Ingredient): Promise<Response<Ingredient>>;
    delete(id: string): Promise<Response<Ingredient>>;
}

export default IIngredientRepo;