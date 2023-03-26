import UserErrors from "../../../domain/entities/errors/UserErrors";
import User from "../../../domain/entities/User";
import userSchema from "../../driven-adapters/validations/Yup/UserSchema";


interface FormErrors {
    [key: string]: string;
}

class UserValidationsRepo {
    async create(user: User): Promise<UserErrors | null> {
        let createUserErrors: any = {};

        await userSchema.validate(user, { abortEarly: false, recursive: true }).then(() => {
            createUserErrors = null;
        }).catch(errors => {
            let formErrors: FormErrors = {};
            errors.inner.forEach((error: any) => {
                formErrors[error.path as string] = error.message;
            });
            createUserErrors = {...formErrors};
        });

        return createUserErrors;
    }
}

export default UserValidationsRepo;