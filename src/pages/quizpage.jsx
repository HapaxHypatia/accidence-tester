import React, {useRef, useState} from "react";
import './quizpage.css'
import questions from "../questions.json";

function Quizpage() {
	const [score, setScore] = useState(0)
	const [checked, setChecked] = useState([
    {
        "name": "singular nominative",
        "checked": " false"
    },
    {
        "name": "plural nominative",
        "checked": " false"
    },
    {
        "name": "singular vocative",
        "checked": " false"
    },
    {
        "name": "plural vocative",
        "checked": " false"
    },
    {
        "name": "singular accusative",
        "checked": " false"
    },
    {
        "name": "plural accusative",
        "checked": " false"
    },
    {
        "name": "singular genitive",
        "checked": " false"
    },
    {
        "name": "plural genitive",
        "checked": " false"
    },
    {
        "name": "singular dative",
        "checked": " false"
    }
])

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
			<input type={"checkbox"} onChange={updateChecked} name={option}></input>
			<span>{option}</span>
		</label>
		)

	const item = questions[(Math.floor(Math.random() * questions.length))]
	const question = item.Ending

	const allAnswers = questions.filter(q => q.Ending === question).map(q => q.Parsing)
	const answers = [...new Set(allAnswers)]

	function updateChecked(e){
		e.preventDefault()
		let r = {name:e.target.name, checked:e.target.checked}
		setChecked([...checked, r])
	//	currently working correctly,but rerenders on every state change
	}

	function check (e){
		e.preventDefault()
		console.log(checked)
		const chosen = checked.filter(item => item.checked===true)
		console.log(chosen)
		let points = 0
			//
			// if (item in answers){
			// 	points++
			// }
			// else{
			// 	points--
			// }
		setScore(score+points)
	}

	function submit(e){
		e.preventDefault()
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
				<form onSubmit={check}>
					<div className={'answerbox'}>{options}</div>
					<button>Submit</button>
				</form>
			</div>


		</div>
	);
}

export default Quizpage;