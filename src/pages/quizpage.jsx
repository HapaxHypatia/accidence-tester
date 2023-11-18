import React from "react";
import Question from "../components/question";
import './quizpage.css'

function Quizpage() {

	const answers = [
		'singular nominative',
		'singular vocative',
		'singular accusative',
		'singular genitive',
		'singular dative',
		'singular ablative',
		'plural nominative',
		'plural vocative',
		'plural accusative',
		'plural genitive',
		'plural dative',
		'plural ablative']
	const options = answers.map((answer, index)=>
		<div className={'option'}>{answer}</div>)
	return (
		<div id={'main'}>
			<p>Quizpage</p>
			<div id={'questioncontainer'}>
				<Question></Question>
					<div className={'answerbox'}>
						{options}
					</div>
			</div>

		</div>
	);
}

export default Quizpage;