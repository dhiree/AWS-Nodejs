import { Request, Response, NextFunction } from "express";
import UserService from '../service/userService'

class UserController {
    public async createUser(req: Request, res: Response, next: NextFunction) {
        const createUser = await UserService.createUser(req.body)
        if (!createUser) {
            console.log("error")
        }
        res.status(201).json({
            data: createUser
        })
    }
}

export default new UserController