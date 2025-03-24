import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { HeroServices } from "./hero.services";

// Controller to create a new bike (blog)
const createBlog = catchAsync(async (req, res) => {

    const result = await HeroServices.createBikeIntoDB(req.body);
    
    sendResponse(res, {
        success: true,
        message: 'Bike created successfully',
        statusCode: StatusCodes.CREATED, // Use CREATED (201) for successful resource creation
        data: { result },
    });
});

// Controller to get all bikes (blogs)
const getAllBlogs = catchAsync(async (req, res) => {
    const blogs = await HeroServices.getAllBikes(req.query);

    sendResponse(res, {
        success: true,
        message: "Bikes fetched successfully",
        statusCode: StatusCodes.OK,
        meta:blogs.meta,
        data: blogs.result,
    });
});
// Controller to get single bikes (blogs)
const getSingleBlogs = catchAsync(async (req, res) => {
    
    const { id } = req.params; 
    const bike = await HeroServices.getSingleBike(id); 
    sendResponse(res, {
        success: true,
        message: "Bikes fetched successfully",
        statusCode: StatusCodes.OK,
        data: bike,
    });
});

// Controller to update a bike (blog)
const updateBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await HeroServices.updateBike(id, req.body); // Update to use `updateBike` service

    sendResponse(res, {
        success: true,
        message: 'Bike updated successfully',
        statusCode: StatusCodes.OK,
        data: { result },
    });
});

// New Controller to delete a bike (blog)
const deleteBlog = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await HeroServices.deleteBike(id);

    sendResponse(res, {
        success: true,
        message: 'Bike deleted successfully',
        statusCode: StatusCodes.OK,
        data: { result },
    });
});

export const HeroController = {
    createBlog,
    updateBlog,
    getAllBlogs,
    deleteBlog,
    getSingleBlogs
};
