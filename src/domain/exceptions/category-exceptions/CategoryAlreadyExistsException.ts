class CategoryAlreadyExistsException extends Error {
    constructor() {
        super("La categoría ya existe");
    }
}

export default CategoryAlreadyExistsException;