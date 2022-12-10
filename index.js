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
    console.log(socket.id)

    socket.on("msg", data => {
        console.log(data)
        io.emit("msg", data)
    })
})