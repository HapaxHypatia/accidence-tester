import React from "react";
import './quizpage.css'
import questions from "../questions.json";

function Quizpage() {

	const parsing = [
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
	const options = parsing.map((answer, index)=>
		<label className={'option'}>
			<input type={"checkbox"} name={index} ></input>
			{answer}
		</label>
		)

	const item = questions[(Math.floor(Math.random() * questions.length))]
	const question = item.Ending

	const allAnswers = questions.filter(q => q.Ending === question).map(q => q.Parsing)
	const answers = [...new Set(allAnswers)]

	function check (e){
		e.preventDefault()

	}

	return (
		<div id={'main'}>
			<p>Select all the options for the following ending. Note that macrons are not used in this quiz</p>
			<div id={'questioncontainer'}>
				<div className={'question'}>{question}</div>
				<form>
					<div className={'answerbox'}>{options}</div>
					<button onSubmit={check}>Submit</button>
				</form>

			</div>


		</div>
	);
}

export default Quizpage;