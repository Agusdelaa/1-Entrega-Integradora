import  express  from "express";
import mongoose from "mongoose";
import handlebars from "express-handlebars"
import productRouter from "./routes/mongoRoutes/products.router.js"
import chatRouter from "./routes/mongoRoutes/chat.router.js"
import cartRouter from "./routes/mongoRoutes/cart.router.js"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";
import { Server } from "socket.io";
import  chatController  from "./Dao/mongoControllers/chatController.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const PORT = 8080

const httpServer = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.use(express.json()) //Info de PostMan

//HandleBars
app.engine("handlebars", handlebars.engine())
app.set("/views", __dirname + "/views")
app.set("views engine", "handlebars")

app.use(express.static(__dirname + "/views"))
app.use(express.static(path.join(__dirname, "public")))

mongoose.connect("mongodb+srv://dagustin001:robertito2210@clusterentregaintegrado.eed0qzq.mongodb.net/ecommerce?retryWrites=true&w=majority")
.then(()=> {
    console.log("Conectado a la Base de Datos")
})
.catch(error => {
    console.log("Error al conectarse a la Base de Datos", error)
})

app.use("/api/products", productRouter)
app.use("/", chatRouter)
app.use("/api/carts", cartRouter)

const io = new Server(httpServer)

io.on("connection" ,(socket) => {

    socket.on("newUserConnection", async (username) => {
        socket.broadcast.emit("newUserConnection", username)
        let messages = await chatController.getMessages()
        socket.emit("allMessages", messages)
    }) 

    socket.on("disconnet", async () => {
        socket.broadcast.emit('user-disconnected', user ?? 'Anónimo');
    })

    socket.on("message", async (message) => {
        await chatController.addMessages(message)
        let messages = await chatController.getMessages()
        io.emit("allMessages", messages)

    })
})