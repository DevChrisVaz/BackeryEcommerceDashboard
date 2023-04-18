import Comment from "@/domain/entities/Comment";
import ICommentRepo from "@/domain/repositories/ICommentRepo";
import axios from "axios";
import Response from "../../../../domain/entities/Response";

axios.defaults.withCredentials = true;

class CommentRepo implements ICommentRepo {
    private readonly url: string;

    constructor(){ 
        this.url = process.env.API_URL + "comments/";
    }

    async getAll(token: string): Promise<Response<Comment[]>> {
        const response = await axios.get(this.url, {
            headers: {
                Authorization: "bearer " + token
            }
        });
        return response;
    }

    async getOne(id: string, token: string): Promise<Response<Comment>> {
        const response = await axios.get(this.url + id, {
            headers: {
                Authorization: "bearer " + token
            }
        });
        return response;
    }

    async create(comment: Comment): Promise<Response<Comment>> {
        const response = await axios.post(this.url, comment);
        return response;
    }

    async update(id:string, comment: Comment, token: string): Promise<Response<Comment>> {
        const response = await axios.put(this.url + id, comment, {
            headers: {
                Authorization: "bearer " + token
            }
        });
        return response;
    }

    async delete(id: string, token: string): Promise<Response<Comment>> {
        const response = await axios.delete(this.url + id, {
            headers: {
                Authorization: "bearer " + token
            }
        });
        return response;
    }
}

export default CommentRepo;