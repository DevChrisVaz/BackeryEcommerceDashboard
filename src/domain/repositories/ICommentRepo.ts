import Comment from "../entities/Comment";
import Response from "../entities/Response";

interface ICommentRepo {
    getAll(): Promise<Response<Comment[]>>;
    getOne(id: string): Promise<Response<Comment>>;
    create(comment: Comment): Promise<Response<Comment>>;
    update(id: string, comment: Comment): Promise<Response<Comment>>;
    delete(id: string): Promise<Response<Comment>>;
}

export default ICommentRepo;