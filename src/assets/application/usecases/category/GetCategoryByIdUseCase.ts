import Category from "../../../domain/entities/Category";
import Response from "../../../domain/entities/Response";
import ICategoryRepo from "../../../domain/repositories/ICategoryRepo";

class GetCategoryByIdUseCase {
    private readonly categoryRepo: ICategoryRepo;

    constructor(categoryRepo: ICategoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    async run(id: string): Promise<Response<Category>> {
        const response: Response<Category> = await this.categoryRepo.getOne(id);
        return response;
    }
}

export default GetCategoryByIdUseCase;