import React from "react";

function OptionBox() {

	return (
		<label className={'option'} id={index}>
			<input type={"checkbox"} onChange={updateChecked} name={option}></input>
			<span>{option}</span>
		</label>
	);
}

export default OptionBox;