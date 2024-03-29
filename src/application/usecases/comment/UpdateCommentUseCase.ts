import Comment from "@/domain/entities/Comment";
import Response from "@/domain/entities/Response";
import ICommentRepo from "@/domain/repositories/ICommentRepo";

class UpdateCommentUseCase {
    private readonly commentRepo: ICommentRepo;

    constructor(commentRepo: ICommentRepo) {
        this.commentRepo = commentRepo;
    }

    async run(id: string, comment: Comment, token: string): Promise<Response<Comment>> {
        const response: Response<Comment> = await this.commentRepo.update(id, comment, token);
        return response;
    }
}

export default UpdateCommentUseCase;