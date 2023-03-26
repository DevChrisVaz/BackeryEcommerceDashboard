import Category from "../../../domain/entities/Category";
import CategoryErrors from "../../../domain/entities/errors/CategoryErrors";
import categorySchema from "../../driven-adapters/validations/Yup/CategorySchema";

interface FormErrors {
    [key: string]: string;
}

class CategoryValidationsRepo {
    async create(category: Category): Promise<CategoryErrors | null> {
        let createCategoryErrors: any = {};

        await categorySchema.validate(category, { abortEarly: false, recursive: true }).then(() => {
            createCategoryErrors = null;
        }).catch(errors => {
            let formErrors: FormErrors = {};
            errors.inner.forEach((error: any) => {
                formErrors[error.path as string] = error.message;
            });
            createCategoryErrors = {...formErrors};
        });

        return createCategoryErrors;
    }
}

export default CategoryValidationsRepo;