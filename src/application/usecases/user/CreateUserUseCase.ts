import UserErrors from "../../../domain/entities/errors/UserErrors";
import Response from "../../../domain/entities/Response";
import User from "../../../domain/entities/User";
import CreateUserException from "../../../domain/exceptions/user-exceptions/CreateUserException";
import IUserRepo from "../../../domain/repositories/IUserRepo";
import IUserValidationsRepo from "../../../domain/repositories/validations/IUserValidationsRepo";

class CreateUserUseCase {
    private readonly userRepo: IUserRepo;
    private readonly userValidationsRepo: IUserValidationsRepo;

    constructor(
        userRepo: IUserRepo,
        userValidationsRepo: IUserValidationsRepo
    ) {
        this.userRepo = userRepo;
        this.userValidationsRepo = userValidationsRepo;
    }

    async run(user: User): Promise<Response<User>> {
        const errors: UserErrors | null = await this.userValidationsRepo.create(user);
        if (errors) throw new CreateUserException(errors);
        const response: Response<User> = await this.userRepo.create(user);
        return response;
    }
}

export default CreateUserUseCase;