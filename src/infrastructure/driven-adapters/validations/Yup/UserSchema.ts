import * as yup from "yup";
import YupPassword from "yup-password";

YupPassword(yup);

const userSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    userName: yup.string().required(),
    password: yup.string().password().required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), undefined], 'Passwords must match'),
    phone: yup.string().length(10).required(),
    birthdate: yup.string().required()
});

export default userSchema;