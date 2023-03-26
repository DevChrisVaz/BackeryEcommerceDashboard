import axios from "axios";
import Product from "../../../../domain/entities/Product";
import Response from "../../../../domain/entities/Response";
import IProductRepo from "../../../../domain/repositories/IProductRepo";

class ProductRepo implements IProductRepo {
    private readonly url: string;

    constructor(){ 
        this.url = "http://localhost:5000/api/products/";
    }

    async getAll(): Promise<Response<Product[]>> {
        const response = await axios.get(this.url);
        return response;
    }

    async getOne(id: string): Promise<Response<Product>> {
        const response = await axios.get(this.url + id);
        return response;
    }

    async create(product: Product): Promise<Response<Product>> {
        const formData = new FormData();
        let tags: string = "";
        formData.append("name", product.name ?? "");
        formData.append("price", product.price?.toString() ?? "");
        formData.append("category", product.category ?? "");
        formData.append("size", product.size ?? "");
        formData.append("description", product.description ?? "");
        product.tags?.forEach((tag) => {
            tags += (tag + "/");
        });
        formData.append("concatTags", tags);
        product.images?.forEach((image: any, index: number) => {
            formData.append("images" + index, image);
        })

        const response = await axios.post(this.url, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response;
    }

    async update(id:string, product: Product): Promise<Response<Product>> {
        const response = await axios.put(this.url + id, product);
        return response;
    }

    async delete(id: string): Promise<Response<Product>> {
        const response = await axios.delete(this.url + id);
        return response;
    }
}

export default ProductRepo;