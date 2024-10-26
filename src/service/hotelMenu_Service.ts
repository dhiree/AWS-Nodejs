// services/hotelMenu_Service.ts
import { Request, Response } from 'express';
import HotelMenu from '../models/hotelMenu_Model';
import uploadImageToS3 from '../../config/uploadImage';
import Holet from '../models/hotelModel'

class HotelMenuService {
    public async createHotelMenu(req: Request, res: Response): Promise<void> {
        try {
            const files = req.files as Express.Multer.File[];
            //const files = (req.file as Express.Multer.File);

            if (!files || files.length === 0) {
                res.status(400).json({ message: 'No files uploaded.' });
                return;
            }

            const imageUrls = [];

            for (const file of files) {
                const imageUrl = await uploadImageToS3(file.buffer, file.originalname, file.mimetype);
                imageUrls.push(imageUrl);
            }

            const newMenuItem = new HotelMenu({
                ...req.body,
                imageUrls: imageUrls,
            });

            await newMenuItem.save()
                .then(() => {
                    console.log("Data Save successfully ")
                }).catch((error) => {
                    console.log("data Not save", error)
                })
            res.status(201).json({ message: 'Menu item created successfully', ...req.body, imageUrls });
        } catch (error) {
            console.error('Error creating hotel menu:', error)
            res.status(500).json({ message: 'Menu creation failed.', error });
        }
    }

    public async getHotelMenu(req: Request, res: Response): Promise<void> {
        try {
            const menuItems = await HotelMenu.find();
            res.status(200).json({ message: 'Hotel menu items retrieved successfully', data: menuItems });
        } catch (error) {
            console.error('Error retrieving hotel menu:', error);
            res.status(500).json({ message: 'Failed to retrieve hotel menu.', error });
        }
    }
    public async getHotelMenuByHotelId(hotelId: string) {
        try {
            const menuItems = await HotelMenu.find({ hotelId });
            if (!menuItems || menuItems.length === 0) {
                console.error(`No menu items found for hotel ID: ${hotelId}`);
                return null;
            }
            return menuItems;
        } catch (error) {
            console.error('Error retrieving hotel menu items:', error);
            throw new Error(`Failed to retrieve menu items for hotel ID: ${hotelId}`);
        }
    }
}

export default new HotelMenuService();