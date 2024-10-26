import mongoose from 'mongoose';
const HotelSchema = new mongoose.Schema({
    hotelName: {
        type: String
    },
    hotelType: {
        type: String,
        enum: ['vegetarian', 'nonVegetarian', 'zym', 'chiness', 'both'],
    },
    location: {
        type: String
    },
    contactNo: {
        type: Number
    },
    HotelRating: {
        type: Number
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Hotel = mongoose.model('hotel', HotelSchema)
export default Hotel