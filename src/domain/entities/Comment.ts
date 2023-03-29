import Timestamps from "./Timestamps";

interface Comment extends Timestamps {
    uuid?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    description?: string;
    score?: number;
    status?: string;
}

export default Comment;