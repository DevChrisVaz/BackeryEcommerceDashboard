class CreateUserException extends Error {
    constructor(options: any) {
        super("Verifique los campos.");
        this.cause = options;
    }
}

export default CreateUserException;