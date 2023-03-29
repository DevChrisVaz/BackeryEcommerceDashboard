import QuoteErrors from "@/domain/entities/errors/QuoteErrors";
import Quote from "@/domain/entities/Quote";
import quoteSchema from "@/infrastructure/driven-adapters/validations/Yup/QuoteSchema";

interface FormErrors {
    [key: string]: string;
}

class QuoteValidationsRepo {
    async create(quote: Quote): Promise<QuoteErrors | null> {
        let quoteErrors: any = {};

        await quoteSchema.validate(quote, { abortEarly: false, recursive: true }).then(() => {
            quoteErrors = null;
        }).catch(errors => {
            let formErrors: FormErrors = {};
            errors.inner.forEach((error: any) => {
                formErrors[error.path as string] = error.message;
            });
            quoteErrors = {...formErrors};
        });

        return quoteErrors;
    }
}

export default QuoteValidationsRepo;