import productModel from "../models/products.model.js"

class ProductController {
    constructor() {
        //nada x ahora
    }

    async getProducts() {
        try {
            let products = await productModel.find()
            // res.send({result: "success", payload: products})
            return products
        } catch (error) {
            throw error
        }
    }


    async getProductById(id) {
        try {
            let user = await productModel.find({_id: id})
            return user
        } catch (error) {
            throw error
        }
    } 

    async addProduct(product) {
        try {
            if (!product.title || ! product.code|| ! product.stock|| !product.price ){
                throw "Error debe llenar todos los campos"
            }
            let response = await productModel.create(product)
            return response
        } catch (error) {
            throw error
            
        }
    
    }

    async deleteProduct(id) {
        try {
            let response = await productModel.deleteOne({_id: id})
            return response
        } catch (error) {
            throw error
        }
    } 

    async updateProduct(id, product) {
        try {
            if (!product.title || ! product.code|| ! product.stock|| !product.price ){
                throw "Error debe llenar todos los campos"
            }
            let response = await productModel.updateOne({_id: id} , product )
            return response
        } catch (error) {
            throw error
        }
    }
}

const productController = new ProductController()

export default productController