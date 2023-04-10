import Topping from "@/domain/entities/Topping";
import Response from "@/domain/entities/Response";
import IToppingRepo from "@/domain/repositories/IToppingRepo";

class UpdateToppingUseCase {
    private readonly toppingRepo: IToppingRepo;

    constructor(toppingRepo: IToppingRepo) {
        this.toppingRepo = toppingRepo;
    }

    async run(id: string, topping: Topping, token: string): Promise<Response<Topping>> {        
        const response: Response<Topping> = await this.toppingRepo.update(id, topping, token);
        return response;
    }
}

export default UpdateToppingUseCase;