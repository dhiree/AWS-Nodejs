
import { Router } from 'express';
import Hotel from '../controller/hotelController';

const router = Router();

router.post('/', Hotel.createHotel);
router.get('/getAllHotel/:userId', Hotel.getAllUserHotelsController);


export default router;