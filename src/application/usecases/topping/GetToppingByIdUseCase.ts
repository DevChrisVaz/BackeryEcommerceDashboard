import Topping from "@/domain/entities/Topping";
import Response from "@/domain/entities/Response";
import IToppingRepo from "@/domain/repositories/IToppingRepo";

class GetToppingByIdUseCase {
    private readonly toppingRepo: IToppingRepo;

    constructor(toppingRepo: IToppingRepo) {
        this.toppingRepo = toppingRepo;
    }

    async run(id: string): Promise<Response<Topping>> {
        const response: Response<Topping> | null = await this.toppingRepo.getOne(id);
        return response;
    }
}

export default GetToppingByIdUseCase;