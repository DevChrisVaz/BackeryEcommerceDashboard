import Comment from "@/domain/entities/Comment";
import CommentErrors from "@/domain/entities/errors/CommentErrors";

interface ICommentValidationsRepo {
    create(comment: Comment): Promise<CommentErrors | null>;
}

export default ICommentValidationsRepo;