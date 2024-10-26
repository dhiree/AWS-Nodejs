// routes/hotelMenu_Routes.ts
import { Router } from 'express';
import multer from 'multer';
import HotelMenuController from '../controller/hotelMenu_Controller';

const upload = multer({ storage: multer.memoryStorage() }).any();
// const storage = multer.memoryStorage();
// const upload = multer({ storage })
// module.exports = upload

const router = Router();
router.post('/', upload, HotelMenuController.createHotelMenu);
router.get('/menu', HotelMenuController.getHotelMenuController);
router.get('/:hotelId', HotelMenuController.getHotelMenuByHotelIdController);




export default router;