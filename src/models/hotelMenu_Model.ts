import mongoose from 'mongoose';
const MenuSchemaSchema = new mongoose.Schema(
    {
        hotelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'hotel',
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        itemName: {
            type: String,
            required: true,
            trim: true
        },

        itemDescription: {
            type: String,
            trim: true
        },

        category: {
            type: String,
            enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Side Dish'],
            default: 'Main Course'
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },
        availability: {
            type: Boolean,
            default: true
        },
        imageUrl: {
            type: [String],
            trim: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        }
    },
    {
        timestamps: true
    }

)

const HotelMenu = mongoose.model('Menu', MenuSchemaSchema);
export default HotelMenu