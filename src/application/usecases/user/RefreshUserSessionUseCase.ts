import Response from "@/domain/entities/Response";
import IUserRepo from "@/domain/repositories/IUserRepo";

class RefreshUserSessionUseCase {
    private readonly userRepo: IUserRepo;

    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }

    async run(): Promise<Response<string>> {
        const response: Response<string> = await this.userRepo.refreshSession();
        return response;
    }
}

export default RefreshUserSessionUseCase;