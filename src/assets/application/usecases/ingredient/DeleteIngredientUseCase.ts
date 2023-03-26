import Ingredient from "../../../domain/entities/Ingredient";
import Response from "../../../domain/entities/Response";
import IIngredientRepo from "../../../domain/repositories/IIngredientRepo";

class DeleteIngredientUseCase {
    private readonly ingredientRepo: IIngredientRepo;

    constructor(ingredientRepo: IIngredientRepo) {
        this.ingredientRepo = ingredientRepo;
    }

    async run(id: string): Promise<Response<Ingredient>> {
        const response: Response<Ingredient> = await this.ingredientRepo.delete(id);
        return response;
    }
}

export default DeleteIngredientUseCase;