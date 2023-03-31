import Response from "@/domain/entities/Response";
import IUserRepo from "@/domain/repositories/IUserRepo";

class UserLogoutUseCase {
    private readonly userRepo: IUserRepo;

    constructor(userRepo: IUserRepo){
        this.userRepo = userRepo;
    }

    async run(): Promise<Response<any>> {
        const response = this.userRepo.logout();
        return response;
    }
}

export default UserLogoutUseCase;