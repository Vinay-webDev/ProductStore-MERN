import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    }, 
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true // createAt, updateAt
})

// create a new product model
const Product = mongoose.model('Product', productSchema);

export default Product;
























