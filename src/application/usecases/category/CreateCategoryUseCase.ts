import Category from "../../../domain/entities/Category";
import CategoryErrors from "../../../domain/entities/errors/CategoryErrors";
import Response from "../../../domain/entities/Response";
import CategoryAlreadyExistsException from "../../../domain/exceptions/category-exceptions/CategoryAlreadyExistsException";
import CreateCategoryException from "../../../domain/exceptions/category-exceptions/CreateCategoryException";
import ICategoryRepo from "../../../domain/repositories/ICategoryRepo";
import ICategoryValidationsRepo from "../../../domain/repositories/validations/ICategoryValidationsRepo";

class CreateCategoryUseCase {
    private readonly categoryRepo: ICategoryRepo;
    private readonly categoryValidationsRepo: ICategoryValidationsRepo;

    constructor(
        categoryRepo: ICategoryRepo,
        categoryValidationRepo: ICategoryValidationsRepo
    ) {
        this.categoryRepo = categoryRepo;
        this.categoryValidationsRepo = categoryValidationRepo;
    }

    async run(category: Category): Promise<Response<Category>> {
        const errors: CategoryErrors | null = await this.categoryValidationsRepo.create(category);
        if (errors) throw new CreateCategoryException(errors);
        const response: Response<Category> | any = await this.categoryRepo.create(category);
        return response;
    }
}

export default CreateCategoryUseCase;