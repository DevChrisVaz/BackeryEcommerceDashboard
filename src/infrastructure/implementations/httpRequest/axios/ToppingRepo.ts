import axios from "axios";
import Topping from "../../../../domain/entities/Topping";
import Response from "../../../../domain/entities/Response";
import IToppingRepo from "../../../../domain/repositories/IToppingRepo";
// import dotenv from "dotenv";

// dotenv.config();

class ToppingRepo implements IToppingRepo {
    private readonly url: string;

    constructor(){ 
        this.url =process.env.API_URL + "/toppings/";
    }

    async getAll(): Promise<Response<Topping[]>> {
        const response = await axios.get(this.url);
        return response;
    }

    async getOne(id: string): Promise<Response<Topping>> {
        const response = await axios.get(this.url + id);
        return response;
    }

    async create(product: Topping, token: string): Promise<Response<Topping>> {
        const formData = new FormData();
        let tags: string = "";
        formData.append("name", product.name ?? "");
        formData.append("price", product.price?.toString() ?? "");
        formData.append("category", product.category ?? "");
        formData.append("unitOfMeasure", product.unitOfMeasure ?? "");
        formData.append("image", product.image ?? "")
        // product.images?.forEach((image: any, index: number) => {
        //     formData.append("images" + index, image);
        // })

        const response = await axios.post(this.url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "bearer " + token
            }
        });
        return response;
    }

    async update(id:string, product: Topping, token: string): Promise<Response<Topping>> {
        const response = await axios.put(this.url + id, product, {
            headers: {
                Authorization: "bearer " + token
            }
        });
        return response;
    }

    async delete(id: string, token: string): Promise<Response<Topping>> {
        const response = await axios.delete(this.url + id,{
            headers: {
                Authorization: "bearer " + token
            }
        });
        return response;
    }
}

export default ToppingRepo;