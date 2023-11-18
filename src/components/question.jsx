import React, {useState} from "react";

function Question(q) {
	const [question, setQuestion] = useState('question')
	return (
		<div className={'question'}>{question}</div>
	);
}

export default Question;