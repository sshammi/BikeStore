import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogServices } from "./blog.services";

// Controller to create a new bike (blog)
const createBlog = catchAsync(async (req, res) => {

    const result = await BlogServices.createBikeIntoDB(req.body);
    
    sendResponse(res, {
        success: true,
        message: 'Bike created successfully',
        statusCode: StatusCodes.CREATED, // Use CREATED (201) for successful resource creation
        data: { result },
    });
});

// Controller to get all bikes (blogs)
const getAllBlogs = catchAsync(async (req, res) => {
    const blogs = await BlogServices.getAllBikes(req.query);

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
    const bike = await BlogServices.getSingleBike(id); 
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
    const result = await BlogServices.updateBike(id, req.body); // Update to use `updateBike` service

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
    const result = await BlogServices.deleteBike(id);

    sendResponse(res, {
        success: true,
        message: 'Bike deleted successfully',
        statusCode: StatusCodes.OK,
        data: { result },
    });
});

const getBikesOnFlashSale = catchAsync(async (req, res) => {
    const bikesOnFlashSale = await BlogServices.getBikesOnFlashSale();

    sendResponse(res, {
        success: true,
        message: "Bikes on flash sale fetched successfully",
        statusCode: StatusCodes.OK,
        data: bikesOnFlashSale,
    });
});
const getBikesTrending = catchAsync(async (req, res) => {
    const bikesOnFlashSale = await BlogServices.getBikesOnTrending();

    sendResponse(res, {
        success: true,
        message: "Bikes on trending fetched successfully",
        statusCode: StatusCodes.OK,
        data: bikesOnFlashSale,
    });
});
const getBikesPopular = catchAsync(async (req, res) => {
    const bikesOnFlashSale = await BlogServices.getBikesOnPopular();

    sendResponse(res, {
        success: true,
        message: "Bikes on popular fetched successfully",
        statusCode: StatusCodes.OK,
        data: bikesOnFlashSale,
    });
});
const getBikesElectric = catchAsync(async (req, res) => {
    const bikesOnFlashSale = await BlogServices.getBikesOnElectric();

    sendResponse(res, {
        success: true,
        message: "Bikes on electric fetched successfully",
        statusCode: StatusCodes.OK,
        data: bikesOnFlashSale,
    });
});
const getBikesUpComming = catchAsync(async (req, res) => {
    const bikesOnFlashSale = await BlogServices.getBikesOnUpComming();

    sendResponse(res, {
        success: true,
        message: "Bikes on upcomming fetched successfully",
        statusCode: StatusCodes.OK,
        data: bikesOnFlashSale,
    });
});

const getBikesBrand = catchAsync(async (req, res) => {
    const { brand } = req.params;
    const bikesOnFlashSale = await BlogServices.getBikesOnBrand(brand);
    sendResponse(res, {
        success: true,
        message: "Bikes on upcomming fetched successfully",
        statusCode: StatusCodes.OK,
        data: bikesOnFlashSale,
    });
});
const getBikesModel = catchAsync(async (req, res) => {
    const { model } = req.params;
    console.log(model);
    const bikesOnFlashSale = await BlogServices.getBikesOnModel(model);
    sendResponse(res, {
        success: true,
        message: "Bikes on Model fetched successfully",
        statusCode: StatusCodes.OK,
        data: bikesOnFlashSale,
    });
});

export const BlogController = {
    createBlog,
    updateBlog,
    getAllBlogs,
    deleteBlog,
    getSingleBlogs,
    getBikesOnFlashSale,
    getBikesTrending,
    getBikesPopular,
    getBikesUpComming,
    getBikesElectric,
    getBikesBrand,
    getBikesModel
};
