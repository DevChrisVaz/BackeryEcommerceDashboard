import Comment from "@/domain/entities/Comment";
import Response from "@/domain/entities/Response";
import ICommentRepo from "@/domain/repositories/ICommentRepo";

class DeleteCommentUseCase {
    private readonly commentRepo: ICommentRepo;

    constructor(commentRepo: ICommentRepo) {
        this.commentRepo = commentRepo;
    }

    async run(id: string, token: string): Promise<Response<Comment>> {
        const response: Response<Comment> = await this.commentRepo.delete(id, token);
        return response;
    }
}

export default DeleteCommentUseCase;