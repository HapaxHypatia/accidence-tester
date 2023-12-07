import React, {useRef, useState} from "react";
import './quizpage.css'
import questions from "../questions.json";
import {useNavigate, useParams} from "react-router-dom";
import Timer from "../components/timer";

function Quizpage() {
	console.log("New render")
	const l= useParams()
	const level = l["level"]
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
	console.log(questions[1])
	const qlist = questions.filter(q => q.Group <= level)
	console.log(qlist)
	console.log(questions[2].Group)
	const question = qlist[(Math.floor(Math.random() * qlist.length))].Ending
	const allAnswers = qlist.filter(q => q.Ending === question).map(q => q.Parsing)
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
			<p>Testing declensions {level}</p>
			{/*TODO create list from level to display here*/}
			<Timer initialSeconds={300}></Timer>
			<p>Select all the options for the following ending. Note that macrons are not used in this quiz</p>
			<p>Total score: {score}</p>
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