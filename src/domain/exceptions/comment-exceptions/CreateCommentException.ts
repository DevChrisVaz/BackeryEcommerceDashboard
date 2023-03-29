class CreateCommentException extends Error {
    constructor(options: any) {
        super("Los campos marcados con * con obligatorios.");
        this.cause = options;
    }
}

export default CreateCommentException;