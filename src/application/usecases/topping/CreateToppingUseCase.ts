import Topping from "@/domain/entities/Topping";
import Response from "@/domain/entities/Response";
import IToppingRepo from "@/domain/repositories/IToppingRepo";

class CreateToppingUseCase {
    private readonly toppingRepo: IToppingRepo;

    constructor(toppingRepo: IToppingRepo) {
        this.toppingRepo = toppingRepo;
    }

    async run(topping: Topping, token: string): Promise<Response<Topping>> {
        const response: Response<Topping> = await this.toppingRepo.create(topping, token);
        return response;
    }
}

export default CreateToppingUseCase;