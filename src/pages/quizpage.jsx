import React from "react";
import AnswerBox from "../components/answerBox";
import Question from "../components/question";
import './quizpage.css'

function Quizpage() {
	return (
		<div id={'main'}>
			<p>Quizpage</p>
			<div id={'questioncontainer'}>
				<Question></Question>
            	<AnswerBox></AnswerBox>
			</div>

		</div>
	);
}

export default Quizpage;