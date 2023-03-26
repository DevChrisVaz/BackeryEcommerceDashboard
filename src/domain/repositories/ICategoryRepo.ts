import type Category from "../entities/Category";
import Response from "../entities/Response";

interface ICategoryRepo {
    getAll(): Promise<Response<Category[]>>;
    getOne(id: string): Promise<Response<Category>>;
    create(category: Category): Promise<Response<Category>>;
    update(id: string, category: Category): Promise<Response<Category>>;
    delete(id: string): Promise<Response<Category>>;
}

export default ICategoryRepo;