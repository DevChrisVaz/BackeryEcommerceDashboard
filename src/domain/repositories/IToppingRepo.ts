import Topping from "../entities/Topping";
import Response from "../entities/Response";

interface IToppingRepo {
    getAll(): Promise<Response<Topping[]>>;
    getOne(id: string): Promise<Response<Topping>>;
    create(topping: Topping, token: string): Promise<Response<Topping>>;
    update(id: string, topping: Topping, token: string): Promise<Response<Topping>>;
    delete(id: string, token: string): Promise<Response<Topping>>;
}

export default IToppingRepo;