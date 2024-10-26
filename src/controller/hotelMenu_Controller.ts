// controllers/hotelMenu_Controller.ts
import { Request, Response, NextFunction } from 'express';
import HotelMenuService from '../service/hotelMenu_Service';
class HotelMenuController {
    public async createHotelMenu(req: Request, res: Response, next: NextFunction) {
        try {
            await HotelMenuService.createHotelMenu(req, res);
        }
        catch (error) {
            console.error('Error in controller:', error);
            res.status(500).json({ message: 'Failed to create hotel menu.', error });
        }
    }
    public async getHotelMenuController(req: Request, res: Response): Promise<void> {
        try {
            await HotelMenuService.getHotelMenu(req, res);
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve hotel menu items.', error });
        }
    }

    public async getHotelMenuByHotelIdController(req: Request, res: Response): Promise<void> {
        try {
            const { hotelId } = req.params;

            const data = await HotelMenuService.getHotelMenuByHotelId(hotelId);

            if (!data) {
                res.status(404).json({ message: `No menu items found for hotel ID ${hotelId}.` });
                return;
            }

            res.status(200).json({ message: 'Menu items retrieved successfully', data });
        } catch (error) {
            console.error("Failed to retrieve menu items:", error);
            res.status(500).json({
                message: 'Failed to retrieve hotel menu items.',
                //error: error.message || error,
            });
        }
    }
}
export default new HotelMenuController();