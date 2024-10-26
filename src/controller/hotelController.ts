import { Request, Response, NextFunction } from "express";
import HotelService from '../service/hotelService'


class UserController {
    public async createHotel(req: Request, res: Response, next: NextFunction) {
        const create = await HotelService.createHotel(req.body)
        if (!create) {
            console.log("error")
        }
        res.status(201).json({
            data: create
        })
    };

    public async getAllUserHotelsController(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;
            const getHotel = await HotelService.getUserHotels(userId)
            if (!getHotel) {
                console.log("user hotel not Found")
            }
            res.status(201).json({
                data: getHotel
            })
        } catch (error) {
            console.log(error)
        }


    }
}

export default new UserController