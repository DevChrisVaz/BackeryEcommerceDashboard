import Ingredient from "../../../domain/entities/Ingredient";
import Response from "../../../domain/entities/Response";
import IIngredientRepo from "../../../domain/repositories/IIngredientRepo";

class GetIngredientByIdUseCase {
    private readonly ingredientRepo: IIngredientRepo;

    constructor(ingredientRepo: IIngredientRepo) {
        this.ingredientRepo = ingredientRepo;
    }

    async run(id: string): Promise<Response<Ingredient>> {
        const response: Response<Ingredient> = await this.ingredientRepo.getOne(id);
        return response;
    }
}

export default GetIngredientByIdUseCase;