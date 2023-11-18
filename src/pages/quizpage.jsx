import React from "react";
import Question from "../components/question";
import './quizpage.css'
import Option from "../components/option";

function Quizpage() {
	return (
		<div id={'main'}>
			<p>Quizpage</p>
			<div id={'questioncontainer'}>
				<Question></Question>
					<div className={'answerbox'}>
						<Option></Option>
						<Option></Option>
						<Option></Option>
						<Option></Option>
					</div>
			</div>

		</div>
	);
}

export default Quizpage;