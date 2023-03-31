import Comment from "@/domain/entities/Comment";
import Response from "@/domain/entities/Response";
import ICommentRepo from "@/domain/repositories/ICommentRepo";

class GetAllCommentsUseCase {
    private readonly commentsRepo: ICommentRepo;

    constructor(commentsRepo: ICommentRepo) {
        this.commentsRepo = commentsRepo;
    }

    async run(token: string): Promise<Response<Comment[]>> {
        let response: Response<Comment[]> = await this.commentsRepo.getAll(token);
        return response;
    }
}

export default GetAllCommentsUseCase;