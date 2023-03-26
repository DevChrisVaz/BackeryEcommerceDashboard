import axios from "axios";
import Response from "../../../../domain/entities/Response";
import User from "../../../../domain/entities/User";
import IUserRepo from "../../../../domain/repositories/IUserRepo";

class UserRepo implements IUserRepo {
    private readonly url: string;

    constructor(){ 
        this.url = "http://localhost:5000/api/users/";
    }

    async getAll(): Promise<Response<User[]>> {
        const response = await axios.get(this.url);
        return response;
    }

    async getOne(id: string): Promise<Response<User>> {
        const response = await axios.get(this.url + id);
        return response;
    }

    async create(user: User): Promise<Response<User>> {
        const formData = new FormData();
        formData.append("firstName", user.firstName ?? "");
        formData.append("lastName", user.lastName ?? "");
        formData.append("userName", user.userName ?? "");
        formData.append("password", user.password ?? "");
        formData.append("phone", user.phone ?? "");
        formData.append("birthdate", user.birthdate ?? "");
        formData.append("profilePicture", user.profilePicture ?? null);
        const response = await axios.post(this.url, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response;
    }

    async update(id:string, user: User): Promise<Response<User>> {
        const response = await axios.put(this.url + id, user);
        return response;
    }

    async delete(id: string): Promise<Response<User>> {
        const response = await axios.delete(this.url + id);
        return response;
    }

    async login(credentials: { userName: string, password: string }): Promise<Response<string>> {
        const response = await axios.post(this.url + "login", credentials);
        return response;
    }
}

export default UserRepo;