import React, {useState} from "react";
import './quizpage.css'
import questions from "../questions.json";

function Quizpage() {
	const [score, setScore] = useState(0)
	const [response, setResponse] = useState([])

	const parsing = [
		'singular nominative',
		'plural nominative',
		'singular vocative',
		'plural vocative',
		'singular accusative',
		'plural accusative',
		'singular genitive',
		'plural genitive',
		'singular dative',
		'plural dative',
		'singular ablative',
		'plural ablative']
	const options = parsing.map((option, index)=>
		<label className={'option'} id={index}>
			<input type={"checkbox"} onChange={changeResponse} name={option}></input>
			<span>{option}</span>
		</label>
		)

	const item = questions[(Math.floor(Math.random() * questions.length))]
	const question = item.Ending

	const allAnswers = questions.filter(q => q.Ending === question).map(q => q.Parsing)
	const answers = [...new Set(allAnswers)]

	function changeResponse(e){
		if (e.target.checked)
			setResponse([e.target.name, [...response]])
	}

	function check (e){
		e.preventDefault()
		let points = 0
		for (let item of response){
			if (item in answers){
				points++
			}
			else{
				points--
			}
		}
		setScore(score+points)
	}

	function reset(){
		setScore(0)
	}

	return (
		<div id={'main'}>
			<p>Select all the options for the following ending. Note that macrons are not used in this quiz</p>
			<p>{score}</p>
			<button onClick={reset}>Reset</button>
			<div id={'questioncontainer'}>
				<div className={'question'}>{question}</div>
				<form>
					<div className={'answerbox'}>{options}</div>
					<button onClick={check}>Submit</button>
				</form>
			</div>


		</div>
	);
}

export default Quizpage;