import Response from "@/domain/entities/Response";
import User from "@/domain/entities/User";
import IUserRepo from "@/domain/repositories/IUserRepo";

class UpdateUserUseCase {
    private readonly userRepo: IUserRepo;

    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }

    async run(id: string, user: User, token: string): Promise<Response<User>> {
        const response: Response<User> = await this.userRepo.update(id, user, token);
        return response;
    }
}

export default UpdateUserUseCase;