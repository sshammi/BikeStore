import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
    const newUser = await User.create(payload);
    return newUser;
};

const getSingleUserFromDB = async (id: string) => {
    const user = await User.findById(id);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

export const userServices = {
    createUserIntoDB,
    getSingleUserFromDB,
};
