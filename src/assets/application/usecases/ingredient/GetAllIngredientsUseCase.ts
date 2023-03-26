import Ingredient from "../../../domain/entities/Ingredient";
import Response from "../../../domain/entities/Response";
import IIngredientRepo from "../../../domain/repositories/IIngredientRepo";

class GetAllIngredientsUseCase {
    private readonly ingredientRepo: IIngredientRepo;

    constructor(ingredientRepo: IIngredientRepo) {
        this.ingredientRepo = ingredientRepo;
    }

    async run(): Promise<Response<Ingredient[]>> {
        let response: Response<Ingredient[]> = await this.ingredientRepo.getAll();
        return response;
    }
}

export default GetAllIngredientsUseCase;