import { Schema, model } from "mongoose";

const nameCollection = 'Cart';

const CartSchema = new Schema({
    products: {
        type: [
            {
                id: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product'
                },
                quantity: {
                    type: Number,
                    required: [true, 'La cantidad del producto es requerida']
                }
            }
        ],
        default: []  // Inicializa products como un array vacío por defecto
    }
});

CartSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.__v;
        return ret;
    }
});

export const cartModel = model(nameCollection, CartSchema);
