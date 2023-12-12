import React from "react";

function EndQuiz(s) {
	const score = s.s
	console.log(score)
	console.log("component rendered")
	return (
		<div id={'main'}>
			<h2>End of quiz</h2>
			<p> You scored {score} points</p>
		</div>
	);
}

export default EndQuiz;