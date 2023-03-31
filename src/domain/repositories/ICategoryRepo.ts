import type Category from "../entities/Category";
import Response from "../entities/Response";

interface ICategoryRepo {
    getAll(): Promise<Response<Category[]>>;
    getOne(id: string): Promise<Response<Category>>;
    create(category: Category, token: string): Promise<Response<Category>>;
    update(id: string, category: Category, token: string): Promise<Response<Category>>;
    delete(id: string, token: string): Promise<Response<Category>>;
}

export default ICategoryRepo;