import Category from "@/domain/entities/Category";
import Response from "@/domain/entities/Response";
import ICategoryRepo from "@/domain/repositories/ICategoryRepo";

class UpdateCategoryUseCase {
    private readonly categoryRepo: ICategoryRepo;

    constructor(categoryRepo: ICategoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    async run(id: string, category: Category, token: string): Promise<Response<Category>> {
        const response: Response<Category> = await this.categoryRepo.update(id, category, token);
        return response;
    }
}

export default UpdateCategoryUseCase;