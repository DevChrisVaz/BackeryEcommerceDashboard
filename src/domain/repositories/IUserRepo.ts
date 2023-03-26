import Response from "../entities/Response";
import User from "../entities/User";

interface IUserRepo {
    getAll(): Promise<Response<User[]>>;
    getOne(id: string): Promise<Response<User>>;
    create(user: User): Promise<Response<User>>;
    update(id: string, user: User): Promise<Response<User>>;
    delete(id: string): Promise<Response<User>>;
    login(credentials: { userName: string, password: string }): Promise<Response<string>>;
}

export default IUserRepo;