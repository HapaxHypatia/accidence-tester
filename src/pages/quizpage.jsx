import React, {useRef, useState} from "react";
import './quizpage.css'
import questions from "../questions.json";

function Quizpage() {
	console.log("New render")
	const [score, setScore] = useState(0)
	const parsing = {
		'singular nominative': false,
		'plural nominative': false,
		'singular vocative': false,
		'plural vocative': false,
		'singular accusative': false,
		'plural accusative': false,
		'singular genitive': false,
		'plural genitive': false,
		'singular dative': false,
		'plural dative': false,
		'singular ablative': false,
		'plural ablative': false}

	const question = questions[(Math.floor(Math.random() * questions.length))].Ending
	const allAnswers = questions.filter(q => q.Ending === question).map(q => q.Parsing)
	let correct = {}
	for (const key in parsing) {
		if (allAnswers.includes(key)){
			correct[key] = true
		}
		else {
			correct[key] = false
		}
	}
	console.log("Correct= "+JSON.stringify(correct))

   //Define useRef() to access form data
   const formData = useRef();

   //OnSubmit function
	const onSubmit = (event) => {
		event.preventDefault()

		// //Disable default action of form submit button
		// event.preventDefault();

		//Accessing form reference with formData variable.
		//Object destructuring to get form fields with their name.
		const form = formData.current;

		let response = {}
		for (var i = 0; i < form.length; i++) {
		  response[form[i].name] = form[i].checked;
		}
		console.log("Response = "+ JSON.stringify(response))

		let points = 0
		for (const key in response){
			if (response[key] === correct[key]){
				points++
			}
			else {points--}
		}
		console.log("Points = "+points)
		let prev = score
		setScore(prev+points)
   }
	const options = Object.keys(parsing).map((option, index)=>
		<label className={'option'} id={index.toString()}>
			<input type={"checkbox"} name={option}></input>
			<span>{option}</span>
		</label>
	)

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
				<form ref={formData} onSubmit={onSubmit}>
					<div className={'answerbox'}>{options}</div>
					<button>Submit</button>
				</form>
			</div>


		</div>
	);
}

export default Quizpage;