import fs from "fs"
import { productManager } from "../app.js"


export class CartManager {
    constructor(path) {
        this.path = path
        this.carts = []
    }

    async getCarts() {
        try {
            const response = await fs.promises.readFile(this.path, "utf-8")
            const carts = JSON.parse(response)
            return carts
        } catch (error) {
            throw error
        }
    }

    async getProductsOfCartById(id) {
        try {
            const carts = await this.getCarts()
            const findedCart = carts.find(cart => cart.id === id)
            if (!findedCart) {
                throw new Error(`No se encontro carrito asociado al id: ${id}`)
            }
            return findedCart.products
        } catch (error) {

        }
    }

    async addCarts() {
        try {
            this.carts = await this.getCarts()
            const autoId = await this.getLastCartId()
            const newCart = {
                id: autoId,
                products: []
            }
            this.carts.push(newCart)
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
            return newCart

        } catch (error) {
            throw error
        }
    }

    async addProductsToCart(cartId, prodId) {
        
        try {
            //Compruebo q exita Cart
            this.carts = await this.getCarts()
            const findedCart = this.carts.find(cart => cart.id === cartId)
            if (!findedCart) {
                throw new Error(`No se encontro carrito asociado al id: ${id}`)
            }
            //Compruebo q  exita Prod en bdd
            await productManager.getProductsById(prodId);
            const prodInCart = findedCart.products.find(prod => prod.ProductId === prodId)
            if (!prodInCart) {
                findedCart.products.push({
                    ProductId: prodId,
                    quantity: 1
                })
            } else {
                prodInCart.quantity++
            }


            await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
            return findedCart


        } catch (error) {
            throw error
        }


    }

    async removeCart(cartId, prodId) {
        try {
            this.carts = await this.getCarts()
            const findedCart = this.carts.find(cart => cart.id === cartId)
            // Compruebo  Cart
            if (!findedCart) {
                throw new Error(`No se encontro carrito asociado al id: ${id}`)
            }
            console.log(findedCart, "llegue al finded")
            const cartProduct = findedCart.products.find(prod => prod.ProductId === prodId)
            if (!cartProduct) {
                throw new Error(`No se encontro al producto de id ${prodId}, en el carrito de id: ${cartId}`)
            }
            console.log(cartProduct, "llegue al cartproduct")
            // Existe busco el elemnto y resto cantitdad o elimino
            if (cartProduct.quantity > 1) {
                cartProduct.quantity--
            } else {
                const index = findedCart.products.indexOf(cartProduct)
                findedCart.products.splice(index, 1)
            }
            //  escribo y guardo el archivo nuevamente 
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts))
            return findedCart

        } catch (error) {
            throw error
        }
    }

    getLastCartId() {
        if (this.carts.length === 0) return 1
        const idGenerator = this.carts[this.carts.length - 1].id
        return idGenerator + 1
    }
}