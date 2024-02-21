import cartModel from "../models/cart.model.js"
import productController from "./productController.js"

class  CartController {

    async addCart() {
        try {
            let  cart = {
                products : []
            }
            cart = await cartModel.create(cart)
            return  cart
        } catch (error) {
            throw  error
        }
    }

     async getCartById(cid) {
        try {
            let findedCart = await cartModel.findById({ _id:cid })
            if (!findedCart) {
                throw `No se encontro el carrito con el ${cid}`
            }
            return findedCart
        } catch (error) {
            throw error
        }
    }

    async addProductToCart(cid, pid) {
        try {
            await productController.getProductById(pid)
            let cart = await this.getCartById(cid)
            let productIndex = cart.products.findIndex(product => product.productId == pid)
            if (productIndex !== -1) {
                cart.products[productIndex].quantity++ 
            } else {
                cart.products.push({productId: pid, quantity: 1})
            }
            cart = await cartModel.findByIdAndUpdate(cid, {products: cart.products})
            return cart
        } catch (error) {
            throw error
        }
    }

    async deleteProduct(cid, pid) {
        try {
            await productController.getProductById(pid)
            let cart = await this.getCartById(cid)
            let productIndex = cart.products.findIndex(product => product.productId == pid)
            if (productIndex === -1){
                throw `Error no se encontro el producto con id: ${pid} en el carrito de id: ${cid}`
            } else {
                if (cart.products[productIndex].quantity > 1) {
                    cart.products[productIndex].quantity--
                } else {
                    cart.products.splice(productIndex, 1)
                }
            }
            cart = await cartModel.findByIdAndUpdate(cid, {products: cart.products})
            return  cart
        } catch (error) {
            throw  error
        }
    }
}

const cartController = new CartController()

export default cartController