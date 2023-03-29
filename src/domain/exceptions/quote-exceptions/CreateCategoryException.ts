class CreateQuoteException extends Error {
    constructor(options: any) {
        super("Los campos con el * son requeridos.");
        this.cause = options;
    }
}

export default CreateQuoteException;