import { Router } from "express";
import cartController from "../../Dao/mongoControllers/cartController.js";

const router = Router()



router.get("/:cid", async (req, res) => {
    try {
        let { cid } = req.params
        let cart = await cartController.getCartById(cid)
        res.send({result: "Success", payload: cart})
    } catch (error) {
        res.send({ status: "ERROR", error: error })
    }
})

router.post("/", async (req, res) => {
    try {
        let cart = await cartController.addCart()
        res.send({result: "Success", payload: cart})
    } catch (error) {
        res.send({ status: "ERROR", error: error })
    }
})


router.post("/:cid/product/:pid" , async (req, res) => {
    try {
        let cid = req.params.cid
        let pid = req.params.pid
        let cart = await cartController.addProductToCart(cid,pid)
        res.send({result: "Success", payload: cart})
    } catch (error) {
        res.send({ status: "ERROR", error: error })
    }
})

router.delete("/:cid/product/:pid" , async (req, res) => {
    try {
        let cid = req.params.cid
        let pid = req.params.pid
        let cart = await cartController.deleteProduct(cid, pid)
        res.send({result: "Success", payload: cart})

    } catch (error){
        res.send({ status: "ERROR", error: error })
    }
})

export default router