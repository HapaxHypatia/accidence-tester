import React, {useState} from "react";

function Question() {
	const [Q, setQ] = useState('question')
	return (
		<div className={'question'}>{Q}</div>
	);
}

export default Question;