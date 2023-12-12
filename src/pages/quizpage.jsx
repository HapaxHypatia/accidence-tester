import React, {useEffect, useRef, useState} from "react";
import './quizpage.css'
import questions from "../questions.json";
import {useNavigate, useParams} from "react-router-dom";
import Timer from "../components/timer";
import EndQuiz from "./endQuiz";

export default Quizpage;

function Quizpage() {

	console.log("New render")
	//set up state
	const navigate = useNavigate()
	const [buttonStatus, setButtonStatus] = useState(true)
	const [timeup, setTimeup] = useState(false)
	const [messageStatus, setMessageStatus] = useState(true)
	const level = useParams()["level"]

	const [score, setScore] = useState(0)
	const [points, setPoints] = useState(0)

	function reset(){
		setScore(0)
		window.location.reload(false);
	}

	function handleCallback (bool){
		setTimeup(bool);
	}

	//set up question & answers
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
	const qlist = questions.filter(q => q.Group <= level)
	const question = qlist[(Math.floor(Math.random() * qlist.length))].Ending
	const allAnswers = qlist.filter(q => q.Ending === question).map(q => q.Parsing)
	let correct = {}
	for (const key in parsing) {
		correct[key] = !!allAnswers.includes(key);

	}
	//set up checkboxes & form
	const formData = useRef();
	function handleClick(e){
		if (e.target.checked === false){
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

	//timeout on submit button to discourage random clicking
	setTimeout(function (){
		if (buttonStatus==true){setButtonStatus(false)}
	},2000)

	function displayPoints(){
		//display points
		let p = points
		setMessageStatus(false)
		setTimeout(() => {
		setMessageStatus(true);}, 750);
	}

	//OnSubmit function
	const onSubmit = (event) => {
		let i;
		event.preventDefault()
		const form = formData.current;
		let response = {}
		for (i = 0; i < form.length-1; i++) {
			response[form[i].name] = form[i].checked;

		}
		//Scoring
		let p = 0
		for (const key in response){
			if (response[key] === correct[key]){
				p++
			}
		}
		setPoints(p)
		displayPoints()

		//reset all checkboxes
		const inputs = document.getElementsByTagName('input')
		for (let i = 0; i<inputs.length; i++)  {
		if (inputs[i].type === 'checkbox') {
		inputs[i].checked = false;}
		}

		setScore(score+points)
		navigate(`/quizpage/${level}`)

	}

	return (
		<div>
			{
				timeup? (<EndQuiz s={score}></EndQuiz>) :

					(<div id={'main'}>
						<p>Testing declensions {level}</p>
						{/*TODO create list from level to display here*/}
						<Timer initialSeconds={300} cb={handleCallback}></Timer>
						<p>Select all the options for the following ending. Note that macrons are not used in this quiz</p>
						<p>Total score: {score}</p>
						<button onClick={reset}>Start again</button>
						<div id={'questioncontainer'}>
							<div className={'question'}>{question}</div>
							<form ref={formData} onSubmit={onSubmit}>
								<div className={'answerbox'}>{options}</div>
								<button disabled={buttonStatus}>Submit</button>
							</form>
						</div>
						<div hidden={messageStatus} className={'message-popup'}>Points earned {points}</div>
					</div>)
			}
		</div>
	);
}
