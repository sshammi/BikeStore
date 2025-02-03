import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userServices } from "./user.service";

const createUser = catchAsync(async (req, res) => {
    const result = await userServices.createUserIntoDB(req.body);
    sendResponse(res, {
        success: true,
        message: "User registered successfully",
        statusCode: 201,
        data: {
            _id: result._id,
            name: result.name,
            email: result.email,
        },
    });
});

const getSingleUser = catchAsync(async (req, res) => {
    const { id } = req.params; 
    const user = await userServices.getSingleUserFromDB(id);

    sendResponse(res, {
        success: true,
        message: "User retrieved successfully",
        statusCode: 200,
        data: user,
    });
});

export const userController = {
    createUser,
    getSingleUser,
};
