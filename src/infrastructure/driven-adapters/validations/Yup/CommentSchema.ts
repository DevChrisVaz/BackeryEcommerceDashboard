import * as yup from "yup";

const commentSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    city: yup.string().required(),
    description: yup.string().required(),
    score: yup.number().min(1).max(5).required()
    // email: yup.string().required()
});

export default commentSchema;