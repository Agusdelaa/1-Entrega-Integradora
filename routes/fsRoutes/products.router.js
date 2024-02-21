import express from "express"
import { productManager } from "../app.js"

const productsRouter = express.Router()

const  app = express()


app.use(express.json())
app.use(express.urlencoded({ extended : true }))


productsRouter.get("/",  async (req, res) => {
    try {
        const limit = parseInt(req.query.limit)
        const products = await productManager.getProducts()
        if (!isNaN(limit) && limit > 0 ){
            const limitedProducts = products.slice(0 ,limit)
            res.json({ status: 'success', payload: limitedProducts });
        }
        res.json({ status: 'success', payload: products });

    } catch (error) {
      
        res.status(500).json({ error: error.message });
    }
})

productsRouter.get("/:pid", async (req, res) =>{
    const prodId = parseInt(req.params.pid)
    try {
        const product = await productManager.getProductsById(prodId)
        res.json({ status: 'success', payload: product });
    } catch (error) {
        console.log(`Producto de id ${prodId} NO encontrado`)
        res.status(500).json({ error: error.message });
    }
        
})

productsRouter.post ("/" , async (req, res) => {
    try {
        const newProduct = req.body
        const response = await productManager.addProduct(newProduct)
        res.json({ status: 'success', payload: response })
    } catch (error) {
        console.log(`Error al agregar Producto`)
        res.status(500).json({ error: error.message });
    }
}
)

//  actualizar producto
productsRouter.put("/:pid", async(req, res) =>{
    try {
        const id = parseInt(req.params.pid)
        let updateProduct = req.body
        const response = await productManager.updateProduct(id, updateProduct)
        res.json({ status: 'Update Saved', payload: response });
     } catch (error) {
        res.status(500).json({ error: error.message });
        
     }
})

productsRouter.delete("/:pid", async (req,res) => {
    try {
        const pid = parseInt(req.params.pid)
        await productManager.deleteProduct(pid)
        res.send(`El producto con el id ${pid} fue eliminado correctamente `)
    } catch (error) {
        res.status(500).json({ error: error.message });
        
    }
})


export default productsRouter