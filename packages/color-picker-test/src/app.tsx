import { ColorPicker } from "@mckayla/color-picker";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
	<div>
		<h1>Color picker!</h1>
		<ColorPicker />
	</div>,
	document.querySelector("#color-picker"),
);
