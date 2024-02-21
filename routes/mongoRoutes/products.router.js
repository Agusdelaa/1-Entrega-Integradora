import { Router } from "express";
import productController from "../../Dao/mongoControllers/productController.js";

const router = Router()

router.get("/", async (req, res) => {
    try {
        let products = await productController.getProducts()
        res.send({ result: "Success", paylod: products })
    } catch (error) {
        res.send({ status: "ERROR", error: error })
    }
})

router.get("/:pid", async (req, res) => {
    try {
        let { pid } = req.params
        let findedProduct = await productController.getProductById(pid)
        res.send({ result: "Success", paylod: findedProduct })
    } catch (error) {
        res.send({ status: "ERROR", error: error })
    }
})

router.post("/", async (req, res) => {
    try {
        let productToAdd = req.body
        if (!productToAdd.title || !productToAdd.code || !productToAdd.stock || !productToAdd.price) {
            res.send({ status: "error", error: "Faltan Datos" })
        }
        let response = await productController.addProduct(productToAdd)
        res.send({ result: "Success", paylod: response })
    } catch (error) {
        res.send({ status: "ERROR", error: error })
    }
})

router.delete("/:pid", async (req, res) => {
    try {
        let { pid } = req.params
        let response = await productController.deleteProduct(pid)
        res.send({ result: "Success", paylod: response })
    } catch (error) {
        res.send({ status: "ERROR", error: error })
    }
})

router.put("/:pid", async (req, res) => {
    try {
        let { pid } = req.params
        let productToUpdate = req.body
        if (!productToUpdate.title || !productToUpdate.code || !productToUpdate.stock || !productToUpdate.price) {
            res.send({ status: "error", error: "Faltan Datos" })
        }
        let response = await productController.updateProduct(pid, productToUpdate)
        res.send({ result: "Success", paylod: response })
    } catch (error) {
        res.send({ status: "ERROR", error: error })
    }
})

export default router