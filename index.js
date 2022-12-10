const express = require("express")
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server, {
    cors: {
        origin: "*"
    }
})
const Chat = require('./models/mySchema')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get("/", (req, res) => {
    Chat.find()
        .then((result) => {
            res.render('home', {messages: result})
        })
        .catch((err) => {
            console.log(err)
        })
})

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://ahmed0saber:ahmed0saber@cluster0.qrdg3nu.mongodb.net/myData?retryWrites=true&w=majority')
    .then(() => {
        server.listen(8080, () => {
            console.log(`Example app listening on http://localhost:8080`)
        })
    })
    .catch((err) => console.log(err))

io.on("connection", socket => {
    socket.on("msg", data => {
        if(data.username.trim().length < 1 || data.msg.trim().length < 1 || data.date.trim().length < 1){
            return
        }

        const currentMsg = {
            username: removeHtmlTags(data.username),
            msg: removeHtmlTags(data.msg),
            date: removeHtmlTags(data.date)
        }
        io.emit("msg", currentMsg)

        const chat = new Chat(currentMsg)
        chat.save()
            .then((result) => {
                // res.redirect('/')
                console.log(result)
            })
            .catch((err) => {
                console.log(err)
            })
    })
})

const removeHtmlTags = (str) => {
    return str.replace(/<\/?\w+>/g, "")
}