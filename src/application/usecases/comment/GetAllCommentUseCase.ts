import Comment from "@/domain/entities/Comment";
import Response from "@/domain/entities/Response";
import ICommentRepo from "@/domain/repositories/ICommentRepo";

class GetAllCommentsUseCase {
    private readonly commentsRepo: ICommentRepo;

    constructor(commentsRepo: ICommentRepo) {
        this.commentsRepo = commentsRepo;
    }

    async run(): Promise<Response<Comment[]>> {
        let response: Response<Comment[]> = await this.commentsRepo.getAll();
        return response;
    }
}

export default GetAllCommentsUseCase;