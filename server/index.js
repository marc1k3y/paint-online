const express = require("express")
const app = express()
const cors = require("cors")
const fs = require("fs")
const path = require("path")
const wsServer = require("express-ws")(app)
const aWss = wsServer.getWss()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started ${PORT}`))

// to decompose
app.ws("/", (ws, req) => {
    ws.send("you connect successful")
    ws.on("message", (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case "connection":
                connectionHandler(ws, msg)
                break
            case "draw":
                broadcastConnection(ws, msg)
                break
        }
    })
})

// app.post("/image", (req, res) => {
//     try {
//         const data = req.body.img.replace("data:image/png;base64,", "")
//         console.log(data);
//         fs.writeFileSync(path.resolve(__dirname, "files", `${req.query.id}.jpg`, data, "base64"))
//         return res.status(200).json({ message: "downloaded" })
//     } catch (e) {
//         console.log(e)
//         return res.status(500).json("error")
//     }
// })
// app.get("/image", (req, res) => {
//     try {

//     } catch (e) {
//         console.log(e)
//         return res.status(500).json("error")
//     }
// })

// to decompose
const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    broadcastConnection(ws, msg)
}

const broadcastConnection = (ws, msg) => {
    aWss.clients.forEach(client => {
        if (client.id === ws.id) {
            client.send(JSON.stringify(msg))
        }
    })
}
