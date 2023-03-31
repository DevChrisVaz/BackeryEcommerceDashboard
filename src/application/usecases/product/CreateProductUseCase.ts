import Product from "@/domain/entities/Product";
import Response from "@/domain/entities/Response";
import IProductRepo from "@/domain/repositories/IProductRepo";

class CreateProductUseCase {
    private readonly productRepo: IProductRepo;

    constructor(productRepo: IProductRepo) {
        this.productRepo = productRepo;
    }

    async run(product: Product, token: string): Promise<Response<Product>> {
        const response: Response<Product> = await this.productRepo.create(product, token);
        return response;
    }
}

export default CreateProductUseCase;