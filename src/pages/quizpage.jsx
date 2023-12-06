import React, {useRef, useState} from "react";
import './quizpage.css'
import questions from "../questions.json";
import {useNavigate, useParams} from "react-router-dom";

function Quizpage() {
	const level = useParams()
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
	const navigate = useNavigate()

	//OnSubmit function
	const onSubmit = (event) => {
		event.preventDefault()
		const form = formData.current;
		let response = {}
		for (var i = 0; i < form.length-1; i++) {
		  response[form[i].name] = form[i].checked;
		}
		console.log("Response = "+ JSON.stringify(response))

		//Scoring
		let points = 0
		for (const key in response){
			if (response[key] === correct[key]){
				points++
			}
			else {points--}
		}
		console.log("Points = "+points)
		//TODO replace alert with a custom messsage
		alert(points+"/12 points")
		let prev = score
		setScore(prev+points)
		//reset all checkboxes
		const inputs = document.getElementsByTagName('input')
		for (var i=0; i<inputs.length; i++)  {
			if (inputs[i].type == 'checkbox')   {
				inputs[i].checked = false;
			}
		}
		navigate(`/quizpage/${level}`)
   }
   function handleClick(e){
		if (e.target.checked == false){
			e.target.setAttribute('checked', 'true')
		}
		else{
			e.target.setAttribute('checked', 'false')
		}
   }
	const options = Object.keys(parsing).map((option, index)=>
		<label className={'option'} id={index.toString()}>
			<input type={"checkbox"} name={option} onClick={handleClick}></input>
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