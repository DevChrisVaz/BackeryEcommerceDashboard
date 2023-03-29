class UserAlreadyCommentedException extends Error {
    constructor() {
        super("El usuario ya ha comentado");
    }
}

export default UserAlreadyCommentedException;