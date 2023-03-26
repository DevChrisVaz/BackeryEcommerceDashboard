interface User {
    uuid?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    userName?: string;
    password?: string;
    confirmPassword?: string;
    phone?: string;
    profilePicture?: any;
    birthdate?: string;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default User;