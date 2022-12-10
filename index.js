const express = require("express")
const app = express()
const server = require("http").createServer(app)
const io = require("socket.io")(server, {
    cors: {
        origin: "*"
    }
})

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get("/", (req, res) => {
    res.render("home")
})

server.listen(8080, () => {
    console.log("Running")
})

io.on("connection", socket => {
    socket.on("msg", data => {
        if(data.username.trim().length < 1 || data.msg.trim().length < 1 || data.date.trim().length < 1){
            return
        }

        io.emit("msg", {
            username: removeHtmlTags(data.username),
            msg: removeHtmlTags(data.msg),
            date: removeHtmlTags(data.date)
        })
    })
})

const removeHtmlTags = (str) => {
    return str.replace(/<\/?\w+>/g, "")
}