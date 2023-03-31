import Category from "@/domain/entities/Category";
import Response from "@/domain/entities/Response";
import ICategoryRepo from "@/domain/repositories/ICategoryRepo";

class DeleteCategoryUseCase {
    private readonly categoryRepo: ICategoryRepo;

    constructor(categoryRepo: ICategoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    async run(id: string, token: string): Promise<Response<Category>> {
        const response: Response<Category> = await this.categoryRepo.delete(id, token);
        return response;
    }
}

export default DeleteCategoryUseCase;