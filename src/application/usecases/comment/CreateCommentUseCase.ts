import Comment from "@/domain/entities/Comment";
import CommentErrors from "@/domain/entities/errors/CommentErrors";
import Response from "@/domain/entities/Response";
import CreateCommentException from "@/domain/exceptions/comment-exceptions/CreateCommentException";
import ICommentRepo from "@/domain/repositories/ICommentRepo";
import ICommentValidationsRepo from "@/domain/repositories/validations/ICommentValidationsRepo";

class CreateCommentUseCase {
    private readonly commentRepo: ICommentRepo;
    private readonly commentValidationsRepo: ICommentValidationsRepo;

    constructor(
        commentRepo: ICommentRepo,
        commentValidationRepo: ICommentValidationsRepo
    ) {
        this.commentRepo = commentRepo;
        this.commentValidationsRepo = commentValidationRepo;
    }

    async run(comment: Comment): Promise<Response<Comment>> {
        const errors: CommentErrors | null = await this.commentValidationsRepo.create(comment);
        if (errors) throw new CreateCommentException(errors);
        const response: Response<Comment> | any = await this.commentRepo.create(comment);
        return response;
    }
}

export default CreateCommentUseCase;