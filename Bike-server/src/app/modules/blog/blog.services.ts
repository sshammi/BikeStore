/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { TBlogPost } from "./blog.interface";
import Bike from "./blog.model";
import QueryBuilder from "../../builder/queryBuilder";

// Existing services
const createBikeIntoDB = async (payload : TBlogPost) => {
    const bike = await Bike.create(payload);
    const populatedBike = await Bike.findById(bike._id);
    return populatedBike;
};

const updateBike = async (id: string, updateData:Partial<TBlogPost>) => {
    const updatedBike = await Bike.findByIdAndUpdate(id, updateData, { new: true }); // `new: true` returns the updated bike
    return updatedBike;
};

const getAllBikes = async (query: Record<string, unknown>) => {
    const productQuery = new QueryBuilder(
      Bike.find(), 
      query,
    )
      .search(['name', 'brand', 'model', 'category']) 
      .filter() 
      .sort() 
      .paginate() 
      .fields(); 
  
    const meta = await productQuery.countTotal(); 
    const result = await productQuery.modelQuery; 
  
    return {
      meta,
      result
    }
};

const getSingleBike = async (id: string) => {
    const bike = await Bike.findById(id); // Finds the bike by ID
    if (!bike) {
        throw new AppError(StatusCodes.NOT_FOUND,"Bike not found");
    }
    return bike;
};

// New deleteBike service
const deleteBike = async (id: string) => {
    const deletedBike = await Bike.findByIdAndDelete(id); // Deletes the bike by ID
    return deletedBike;
};

const getBikesOnFlashSale = async () => {
    const bikesOnFlashSale = await Bike.find({ flashSale: "true" });
    return bikesOnFlashSale;
};
const getBikesOnTrending = async () => {
    const bikesOnFlashSale = await Bike.find({ trending: "true" });
    return bikesOnFlashSale;
};
const getBikesOnPopular = async () => {
    const bikesOnFlashSale = await Bike.find({ popular: "true" });
    return bikesOnFlashSale;
};
const getBikesOnElectric = async () => {
    const bikesOnFlashSale = await Bike.find({ electric: "true" });
    return bikesOnFlashSale;
};
const getBikesOnUpComming = async () => {
    const bikesOnFlashSale = await Bike.find({ upcoming: "true" });
    return bikesOnFlashSale;
};
const getBikesOnBrand = async (brand:string) => {
    const bikesOnFlashSale = await Bike.find({ brand:brand });
    return bikesOnFlashSale;
};
const getBikesOnModel = async (model:string) => {
    const bikesOnFlashSale = await Bike.find({ model:model });
    console.log(bikesOnFlashSale);
    return bikesOnFlashSale;
};
export const BlogServices = {
    createBikeIntoDB,
    getAllBikes,
    updateBike,
    deleteBike,
    getSingleBike,
    getBikesOnFlashSale,
    getBikesOnTrending,
    getBikesOnPopular,
    getBikesOnUpComming,
    getBikesOnElectric,
    getBikesOnBrand,
    getBikesOnModel,
};
