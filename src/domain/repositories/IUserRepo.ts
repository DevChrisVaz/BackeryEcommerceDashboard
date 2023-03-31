import Response from "../entities/Response";
import User from "../entities/User";

interface IUserRepo {
    getAll(token: string): Promise<Response<User[]>>;
    getOne(id: string, token: string): Promise<Response<User>>;
    create(user: User, token: string): Promise<Response<User>>;
    update(id: string, user: User, token: string): Promise<Response<User>>;
    delete(id: string, token: string): Promise<Response<User>>;
    login(credentials: { userName: string, password: string }): Promise<Response<string>>;
    refreshSession(): Promise<Response<string>>;
    logout(): Promise<Response<any>>;
}

export default IUserRepo;