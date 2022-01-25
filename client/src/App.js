import React from "react"
import { NavLink, Route, Routes, useLocation } from "react-router-dom"
import Canvas from "./components/Canvas"
import SettingsBar from "./components/SettingsBar"
import ToolBar from "./components/ToolBar"
import "./styles/app.scss"

export default function App() {
	const location = useLocation()
	if (location.pathname === "/") {
		return (
			<NavLink to={`${Date.now().toString(16)}`}>new room</NavLink>
		)
	}

	return (
		<div className="App">
			<Routes>
				<Route path="/:id" element={[<ToolBar />, <SettingsBar />, <Canvas />]} />
			</Routes>
		</div>
	)
}