import Category from "../../../domain/entities/Category";
import Response from "../../../domain/entities/Response";
import ICategoryRepo from "../../../domain/repositories/ICategoryRepo";

class GetAllCategoriesUseCase {
    private readonly categoryRepo: ICategoryRepo;

    constructor(categoryRepo: ICategoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    async run(): Promise<Response<Category[]>> {
        let response: Response<Category[]> = await this.categoryRepo.getAll();
        return response;
    }
}

export default GetAllCategoriesUseCase;