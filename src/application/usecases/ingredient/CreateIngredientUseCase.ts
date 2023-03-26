import Ingredient from "../../../domain/entities/Ingredient";
import Response from "../../../domain/entities/Response";
import IIngredientRepo from "../../../domain/repositories/IIngredientRepo";

class CreateIngredientUseCase {
    private readonly ingredientRepo: IIngredientRepo;

    constructor(
        ingredientRepo: IIngredientRepo
    ) {
        this.ingredientRepo = ingredientRepo;
    }

    async run(ingredient: Ingredient): Promise<Response<Ingredient>> {
        // const errors: CategoryErrors | null = await this.categoryValidationsRepo.create(ingredient);
        // if (errors) throw new CreateCategoryException(errors);
        const response: Response<Ingredient> = await this.ingredientRepo.create(ingredient);
        return response;
    }
}

export default CreateIngredientUseCase;