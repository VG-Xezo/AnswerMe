import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser"
import questionSchema from "./questionSchema.js"
import config from "./config.js"

const app = express()
const PORT = process.env.PORT || 8000

const URL = `${config.dbURL}`

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

app.use(cors())
app.use(bodyParser.json())

app.post("/addquestion", (req, res) => {
    questionSchema.create(req.body, (err, data) => {

        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.put("/addreply/:id", (req, res) => {
    const id = req.params.id
    questionSchema.findOne({ _id: id }, function (err, foundObject) {
        if (err) {
            console.log(err)
            res.status(500).send()
        } else {
            if (!foundObject) {
                res.status(404).send()
            } else {

                let newReply = {}

                if (req.body.reply) {
                    newReply.reply = req.body.reply
                }

                if (req.body.username) {
                    newReply.username = req.body.username
                }


                let replies = foundObject.replies
                replies.push(newReply)

                foundObject.replies = replies

                foundObject.save(function (err, updatedObject) {
                    if (err) {
                        console.log(err)
                        res.status(500).send()
                    } else {
                        res.send(updatedObject)
                    }
                })
            }
        }
    })
})

app.get("/getquestions", (req, res) => {
    questionSchema.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.listen(PORT)