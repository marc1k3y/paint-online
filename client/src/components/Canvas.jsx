import React, { useEffect, useRef } from "react"
import { observer } from "mobx-react-lite"
import "../styles/canvas.scss"
import canvasState from "../store/canvasState"
import toolState from "../store/toolState"
import Brush from "../tools/Brush"
import { useLocation } from "react-router-dom"
import Rect from "../tools/Rect"
import axios from "axios"

export default observer(function Canvas() {
    const canvasRef = useRef()
    const location = useLocation()
    const sessionId = location.pathname.split("/")[1]

    const mouseDownHandler = () => {
        canvasState.pushToUndo(canvasRef.current.toDataURL())
        // axios.post(`http://localhost:5000/image?id=${sessionId}`, {img: canvasRef.current.toDataURL()})
    }

    useEffect(() => {
        canvasState.setCanvas(canvasRef.current)
    }, [])

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:5000/")
        canvasState.setSocket(socket)
        canvasState.setSessionId(sessionId)
        toolState.setTool(new Brush(canvasRef.current, socket, sessionId))
        socket.onopen = () => {
            console.log("connection was installed")
            socket.send(JSON.stringify({
                id: location.pathname.split("/")[1],
                // username: canvasState.username,
                username: "marc1k3y",
                method: "connection"
            }))
        }
        socket.onmessage = (event) => {
            let msg = JSON.parse(event.data)
            switch (msg.method) {
                case "connection":
                    break
                case "draw":
                    drawHandler(msg)
                    break
            }
        }
    })

    const drawHandler = (msg) => {
        const figure = msg.figure
        const ctx = canvasRef.current.getContext("2d")
        switch (figure.type) {
            case "brush":
                Brush.draw(ctx, figure.x, figure.y)
                break
            case "rect":
                Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)
            case "finish":
                ctx.beginPath()
                break
        }
    }

    return (
        <div className="canvas">
            <canvas onMouseDown={() => mouseDownHandler()} ref={canvasRef} width={600} height={400} />
        </div>
    )
})
