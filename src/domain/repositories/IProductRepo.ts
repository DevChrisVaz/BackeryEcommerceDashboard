import Product from "../entities/Product";
import Response from "../entities/Response";

interface IProductRepo {
    getAll(): Promise<Response<Product[]>>;
    getOne(id: string): Promise<Response<Product>>;
    create(product: Product, token: string): Promise<Response<Product>>;
    update(id: string, product: Product, token: string): Promise<Response<Product>>;
    delete(id: string, token: string): Promise<Response<Product>>;
}

export default IProductRepo;