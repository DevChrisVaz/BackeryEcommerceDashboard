
import Category from "@/domain/entities/Category";
import CategoryErrors from "@/domain/entities/errors/CategoryErrors";
import Response from "@/domain/entities/Response";
import CreateCategoryException from "@/domain/exceptions/category-exceptions/CreateCategoryException";
// import CreateCategoryException from "@/domain/exceptions/category-exceptions/CreateCategoryException";
// import CategoryAlreadyExistsException from "@/domain/exceptions/category-exceptions/CategoryAlreadyExistsException";
import ICategoryRepo from "@/domain/repositories/ICategoryRepo";
import ICategoryValidationsRepo from "@/domain/repositories/validations/ICategoryValidationsRepo";

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

    async run(category: Category, token: string): Promise<Response<Category>> {
        const errors: CategoryErrors | null = await this.categoryValidationsRepo.create(category);
        if (errors) throw new CreateCategoryException(errors);
        const response: Response<Category> | any = await this.categoryRepo.create(category, token);
        return response;
    }
}

export default CreateCategoryUseCase;