import Product from '../model/product.model.js';
import mongoose from 'mongoose';

export const getAllProducts = async(req, res) => {
    try {
        //[1] to get all products we need to use find() method on Product and pass in an empty object ===>>> Product.find({});
        const products = await Product.find({});
        res.status(200).json({success: true, data: products });
    } catch(error) {
        console.log(`Error in fetching all products:`, error.message);
        res.status(500).json({success: false, message: "server error"});
    }
}

export const createProduct = async(req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({succes: false, message: `Please provide all fields`});
    }
    // if we are at this step means we do have all the fields that we need
    //[2] now using the methods of mongoose we create a new product in db
    const newProduct = new Product(product); // don't get confused! the new Product() is coming from the product model we created and the product we passing inside is the product coming from the requrest ==>> const product = req.body;
    try {
        // [3] we have created the new product now we need to save it on our database
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch(error) {
        console.error(`Error in creating product:`, error.message);
        res.status(500).json({ success: false, message: "server error"});
    }  
}

export const updateProduct = async(req, res) => {
    const { id } = req.params;
    const product = req.body;
    // [1] to handle the invalid id this not much import tho because we are gonna update the product in front in the final build we will get id but to test it out in postman we need the id. so let do this anyway
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({success: false, message: "invalid product id"});
    }
    
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(201).json({success: true, data: updatedProduct});
    } catch(error) {
        console.log(`Error in updating product:`, error.message);
        res.status(500).json({success: false, message: "server error"});
    }
}

export const deleteProduct = async(req, res) => {
    //[1] let's grab id from the request by destructuring 
    const { id } = req.params;
    //let's check id by logging it to the console
    //console.log("id:", id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({success: false, message: "invalid product id"});
    }
    
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: `product deleted!`});
    } catch(error) {
        //console.log for debugging purposes***
        console.error(`Error in deleting product:`, error.message);
        res.status(500).json({success: false, message: "server error!"});
    }
}


