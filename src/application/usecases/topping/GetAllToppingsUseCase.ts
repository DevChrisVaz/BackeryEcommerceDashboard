import Topping from "@/domain/entities/Topping";
import Response from "@/domain/entities/Response";
import IToppingRepo from "@/domain/repositories/IToppingRepo";

class GetAllToppingsUseCase {
    private readonly toppingRepo: IToppingRepo;

    constructor(toppingRepo: IToppingRepo) {
        this.toppingRepo = toppingRepo;
    }

    async run(): Promise<Response<Topping[]>> {
        const response: Response<Topping[]> = await this.toppingRepo.getAll();
        return response;
    }
}

export default GetAllToppingsUseCase;