import React from "react";

function EndQuiz(s) {
	const score = s.s
	console.log(score)
	console.log("component rendered")
	return (
		<div id={'main'}>
			{score}
			<p>End of quiz</p>
		</div>
	);
}

export default EndQuiz;