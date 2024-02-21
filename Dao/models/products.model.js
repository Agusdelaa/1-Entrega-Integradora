import mongoose from "mongoose";

const productCollection = "products"

const productSchema = new mongoose.Schema({
    title: {type: String, required: true, max: 100},
    code: {type: String, required: true, unique: true , max: 100,},
    stock: {type: Number, required: true, },
    price: {type: Number, required: true,}
    
})

const productModel = mongoose.model(productCollection,productSchema)

export default productModel
