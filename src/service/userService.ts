import { Request, Response, NextFunction } from "express";
import User from "../models/ userModel";


class UserService {
    public async createUser(userData: any) {
        try {
            const user = await User.create(userData)
            console.log("user not found -------------------", user)
            return user
        } catch (error) {
            console.log("user not create")
        }

    }
}

export default new UserService();