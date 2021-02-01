import mongoose from "mongoose"

const questionSchema = mongoose.Schema({
    title: String,
    content: String,
    username: String,
    thumbnail: String,
    catergory: String,
    replies: []
})

export default mongoose.model("Questions", questionSchema)