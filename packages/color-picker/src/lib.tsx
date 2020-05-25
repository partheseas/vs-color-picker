import React from "react";
import styled from "styled-components";

const Gradient = styled.div`
	background-color: linear-gradient(hsl(0, 100%, 0%), hsl(100, 100%, 0%));
`;

export const ColorPicker = () => (
	<Gradient>
		<h1>Hello friend</h1>
	</Gradient>
);
