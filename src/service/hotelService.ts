import { Request, Response, NextFunction } from "express";
import Hotel from "../models/hotelModel";
import User from "../models/ userModel";
import mongoose, { Types } from 'mongoose';



class HotelService {
    public async createHotel(hotelData: any) {
        try {
            const hotel = await Hotel.create({ ...hotelData })
            return hotel
        } catch (error) {
            console.log("Hotel Not Create...", error)
        }

    };


    public async getUserHotels(userId: string) {
        try {
            const userHotelsData = await Hotel.aggregate([
                {
                    $match: { userId: new Types.ObjectId(userId) }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'User'
                    }
                },
                {
                    $group: {
                        _id: '$User._id',
                        User: { $first: '$User' },
                        Hotels: {
                            $push: {
                                _id: '$_id',
                                hotelName: '$hotelName',
                                hotelType: '$hotelType',
                                location: '$location',
                                contactNo: '$contactNo',
                                HotelRating: '$HotelRating',
                                userId: '$userId',
                                __v: '$__v'
                            }
                        }
                    }
                },
            ]);

            return userHotelsData
        } catch (error) {
            console.log("Error to Find the User Hotels", error);
            throw error;
        }
    }


}
export default new HotelService();