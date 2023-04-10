import Topping from "@/domain/entities/Topping";
import Response from "@/domain/entities/Response";
import IToppingRepo from "@/domain/repositories/IToppingRepo";

class DeleteToppingUseCase {
    private readonly toppingRepo: IToppingRepo;

    constructor(toppingRepo: IToppingRepo) {
        this.toppingRepo = toppingRepo;
    }

    async run(id: string, token: string): Promise<Response<Topping>> {
        const response: Response<Topping> = await this.toppingRepo.delete(id, token);
        return response;
    }
}

export default DeleteToppingUseCase;