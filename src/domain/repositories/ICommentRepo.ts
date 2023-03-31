import Comment from "../entities/Comment";
import Response from "../entities/Response";

interface ICommentRepo {
    getAll(token: string): Promise<Response<Comment[]>>;
    getOne(id: string, token: string): Promise<Response<Comment>>;
    create(comment: Comment): Promise<Response<Comment>>;
    update(id: string, comment: Comment, token: string): Promise<Response<Comment>>;
    delete(id: string, token: string): Promise<Response<Comment>>;
}

export default ICommentRepo;