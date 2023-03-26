import Category from "../../entities/Category";
import CategoryErrors from "../../entities/errors/CategoryErrors";

interface ICategoryValidationsRepo {
    create(category: Category): Promise<CategoryErrors | null>;
}

export default ICategoryValidationsRepo;