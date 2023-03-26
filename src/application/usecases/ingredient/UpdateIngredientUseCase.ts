import Ingredient from "../../../domain/entities/Ingredient";
import Response from "../../../domain/entities/Response";
import IIngredientRepo from "../../../domain/repositories/IIngredientRepo";

class UpdateIngredientUseCase {
    private readonly ingredientRepo: IIngredientRepo;

    constructor(ingredientRepo: IIngredientRepo) {
        this.ingredientRepo = ingredientRepo;
    }

    async run(id: string, ingredient: Ingredient): Promise<Response<Ingredient>> {
        const response: Response<Ingredient> = await this.ingredientRepo.update(id, ingredient);
        return response;
    }
}

export default UpdateIngredientUseCase;