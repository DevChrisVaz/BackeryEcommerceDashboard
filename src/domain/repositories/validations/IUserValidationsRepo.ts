import UserErrors from "../../entities/errors/UserErrors";
import User from "../../entities/User";

interface IUserValidationsRepo {
    create(user: User): Promise<UserErrors | null>;
}

export default IUserValidationsRepo;