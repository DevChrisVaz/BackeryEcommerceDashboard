import Response from "../../../domain/entities/Response";
import User from "../../../domain/entities/User";
import IUserRepo from "../../../domain/repositories/IUserRepo";

class DeleteUserUseCase {
    private readonly userRepo: IUserRepo;

    constructor(userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }

    async run(id: string): Promise<Response<User>> {
        const response: Response<User> = await this.userRepo.delete(id);
        return response;
    }
}

export default DeleteUserUseCase;