import React from "react"
import toolState from "../store/toolState"
import "../styles/toolbar.scss"

export default function SettingsBar() {
    const changeColor = (color) => {
        toolState.setStrokeColor(color)
    }
    return (
        <div className="setting-bar">
            <label style={{marginLeft: 5}} htmlFor="line-width">Line width</label>
            <input
                id="line-width"
                onChange={e => toolState.setLineWidth(e.target.value)}
                type="number"
                min={1} max={50}
                defaultValue={1}
                style={{margin: "0 10px"}} />
            <input 
            onChange={e => changeColor(e.target.value)}
            type="color" />
        </div>
    )
}
