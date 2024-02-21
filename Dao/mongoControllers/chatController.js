import chatModel from "../models/chat.model.js"

class ChatController {

    async getMessages() {
        try {
            let messages = await chatModel.find()
            return messages
        } catch (error) {
            throw error
        }
    }

    async addMessages(data) {
        try {
            await chatModel.create(data)
            if (!data){
                throw "No se pudo crear el mensaje"
            }
            console.log("eNTRE ACA ANTES DEL ERROR")
            return 
        } catch (error) {
            throw error
        }
    }

}

const chatController = new ChatController()

export default chatController

