import Product from "@/domain/entities/Product";
import Response from "@/domain/entities/Response";
import IProductRepo from "@/domain/repositories/IProductRepo";

class DeleteProductUseCase {
    private readonly productRepo: IProductRepo;

    constructor(productRepo: IProductRepo) {
        this.productRepo = productRepo;
    }

    async run(id: string, token: string): Promise<Response<Product>> {
        const response: Response<Product> = await this.productRepo.delete(id, token);
        return response;
    }
}

export default DeleteProductUseCase;