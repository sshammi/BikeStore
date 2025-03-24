/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/queryBuilder";
import { THero } from "./hero.interface";
import Hero from "./hero.model";

// Existing services
const createBikeIntoDB = async (payload : THero) => {
    const bike = await Hero.create(payload);
    const populatedBike = await Hero.findById(bike._id);
    return populatedBike;
};

const updateBike = async (id: string, updateData:Partial<THero>) => {
    const updatedBike = await Hero.findByIdAndUpdate(id, updateData, { new: true }); // `new: true` returns the updated bike
    return updatedBike;
};

const getAllBikes = async (query: Record<string, unknown>) => {
    const productQuery = new QueryBuilder(
      Hero.find(), 
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
    const bike = await Hero.findById(id); // Finds the bike by ID
    if (!bike) {
        throw new AppError(StatusCodes.NOT_FOUND,"Bike not found");
    }
    return bike;
};

// New deleteBike service
const deleteBike = async (id: string) => {
    const deletedBike = await Hero.findByIdAndDelete(id); // Deletes the bike by ID
    return deletedBike;
};

export const HeroServices = {
    createBikeIntoDB,
    getAllBikes,
    updateBike,
    deleteBike,
    getSingleBike // Export the new deleteBike service
};
