import axios from "axios";
import Response from "../../../../domain/entities/Response";
import User from "../../../../domain/entities/User";
import IUserRepo from "../../../../domain/repositories/IUserRepo";

axios.defaults.withCredentials = true;

class UserRepo implements IUserRepo {
    private readonly url: string;

    constructor(){ 
        this.url = process.env.API_URL + "users/";
    }

    async getAll(token: string): Promise<Response<User[]>> {
        const response = await axios.get(this.url, {
            headers: {
                "Authorization": "bearer " + token
            }
        });
        return response;
    }

    async getOne(id: string, token: string): Promise<Response<User>> {
        const response = await axios.get(this.url + id, {
            headers: {
                Authorization: "bearer " + token
            }
        });
        return response;
    }

    async create(user: User, token: string): Promise<Response<User>> {
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
                "Content-Type": "multipart/form-data",
                Authorization: "bearer " + token
            }
        });
        return response;
    }

    async update(id:string, user: User, token: string): Promise<Response<User>> {
        const response = await axios.put(this.url + id, user, {
            headers: {
                Authorization: "bearer " + token
            }
        });
        return response;
    }

    async delete(id: string, token: string): Promise<Response<User>> {
        const response = await axios.delete(this.url + id, {
            headers: {
                Authorization: "bearer " + token
            }
        });
        return response;
    }

    async login(credentials: { userName: string, password: string }): Promise<Response<string>> {
        const response = await axios.post(this.url + "login", credentials);
        return response;
    }

    async refreshSession(): Promise<Response<string>> {
        const response = await axios.get(this.url + "refresh", { withCredentials: true });
        return response;
    }

    async logout(): Promise<Response<any>> {
        const response = await axios.get(this.url + "logout", { withCredentials: true });
        return response;
    }
}

export default UserRepo;