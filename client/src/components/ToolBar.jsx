import React from "react"
import "../styles/toolbar.scss"
import toolState from "../store/toolState"
import canvasState from "../store/canvasState"
import Brush from "../tools/Brush"
import Rect from "../tools/Rect"
import Eraser from "../tools/Eraser"

export default function ToolBar() {
    const changeColor = (color) => {
        toolState.setFillColor(color)
    }

    const download = () => {
        const dataUrl = canvasState.canvas.toDataURL()
        const a = document.createElement("a")
        a.href = dataUrl
        a.download = canvasState.sessionId + ".jpg"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }
    return (
        <div className="toolbar">
            <button className="toolbar__btn brush" onClick={() => toolState.setTool(new Brush(canvasState.canvas, canvasState.socket, canvasState.sessionId))} />
            <button className="toolbar__btn rect" onClick={() => toolState.setTool(new Rect(canvasState.canvas, canvasState.socket, canvasState.sessionId))} />
            <button className="toolbar__btn eraser" onClick={() => toolState.setTool(new Eraser(canvasState.canvas))} />
            <button className="toolbar__btn brush" />
            <button className="toolbar__btn brush" />
            <input onChange={e => changeColor(e.target.value)} type="color" style={{ marginLeft: 10 }} />
            <button className="toolbar__btn undo" onClick={() => canvasState.undo()} />
            <button className="toolbar__btn redo" onClick={() => canvasState.redo()} />
            <button className="toolbar__btn save" onClick={() => download()} />
        </div>
    )
}
