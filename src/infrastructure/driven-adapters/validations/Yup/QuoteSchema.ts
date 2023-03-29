import * as yup from "yup";

const quoteSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    address: yup.string().required(),
    city: yup.string().required(),
    zip: yup.string().length(5).required(),
    phone: yup.string().length(10).required(),
    email: yup.string().required()
});

export default quoteSchema;