import User from "../../entities/User";

const getFullName = (user: User) => {
    user.fullName = user.firstName + " " + user.lastName;
    return user;
}

export default getFullName;