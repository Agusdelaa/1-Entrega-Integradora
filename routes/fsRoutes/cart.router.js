import express  from "express";
import { cartManager } from "../app.js"

const cartRouter = express.Router()

const app = express()

app.use(express.json())
app.use(express.Router({ extended : true}))

cartRouter.post("/", async (req, res) => {
    try {
        const newCart = await cartManager.addCarts()
        console.log("Carrito creado", newCart)
        res.json({status: "success" , payload: newCart })
    } catch (error) {
        res.status(500).json({error: message})
    }

})

cartRouter.get("/:cid", async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid)
        const productsCart = await cartManager.getProductsOfCartById(cartId)
        res.json({status: "success" , payload: productsCart })

    } catch (error) {
        res.status(500).json({error: message})
        
    }
})

cartRouter.post("/:cid/product/:pid" , async(req, res) => {
    try {
        const cartId = parseInt(req.params.cid)
        const prodId = parseInt(req.params.pid)
        const findedCart = await cartManager.addProductsToCart(cartId, prodId)
        res.json({status: "success" , payload: findedCart })
    } catch (error) {
        res.status(500).json({error: "pepe"})
        
    }
})

cartRouter.delete("/:cid/product/:pid" , async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid)
        const prodId = parseInt(req.params.pid)
        const cart = await cartManager.removeCart(cartId,prodId)
        res.json({status: "success", payload : cart})
    } catch (error) {
        res.status(500).json({error: "sapo"})
    }
})

export default cartRouter
