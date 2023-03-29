import Comment from "@/domain/entities/comment";
import CommentErrors from "@/domain/entities/errors/CommentErrors";

interface ICommentValidationsRepo {
    create(comment: Comment): Promise<CommentErrors | null>;
}

export default ICommentValidationsRepo;