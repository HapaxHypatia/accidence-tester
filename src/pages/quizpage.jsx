import React, {useRef, useState} from "react";
import './quizpage.css'
import questions from "../questions.json";
import macron_questions from "../macron_questions.json";
import {useNavigate, useParams} from "react-router-dom";
import Timer from "../components/timer";
import EndQuiz from "./endQuiz";

export default Quizpage;

//Changing comment to test deployment path testing

function Quizpage() {

	console.log("New render")
	//set up state
	const navigate = useNavigate()
	const [timeup, setTimeup] = useState(false)
	const [messageStatus, setMessageStatus] = useState(true)
	const params = useParams()
	const minutes = params["minutes"]
	const level = params["level"]
	const macrons = params["macrons"]
	const [score, setScore] = useState(0)
	const [points, setPoints] = useState(0)
	const [feedback, setFeedback] = useState([])

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

	//set macron status
	let qdata
	if (macrons === 'false'){ qdata = questions}
	else{qdata = macron_questions}

	// filter question list by array of levels selected
	let qlist = []
	for (const option of level) {
		let Qs = qdata.filter(q => q.Group === parseInt(option))
		qlist = (qlist.concat(...Qs))
	}

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
	const submit = useRef()
	setTimeout(function (){submit.current.disabled = false},2000)

	function displayPoints(){
		//display points
		setMessageStatus(false)
		setTimeout(() => {
		setMessageStatus(true);}, 2500);
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
		//TODO consider different scoring method (no points for unclicked items)
		//TODO not getting all possible answers on endings that go across declensions
		let p = 0
		for (const key in response){
			if (response[key] === correct[key]){
				p++
			}
		}
		setPoints(p)

		const fb = qlist.filter(q => q.Ending === question).map((q)=>
		<div>
			Declension {q.Group}: {q.Parsing}
		</div>
		)
		setFeedback(fb)
		displayPoints()


		//reset all checkboxes
		const inputs = document.getElementsByTagName('input')
		for (let i = 0; i<inputs.length; i++)  {
		if (inputs[i].type === 'checkbox') {
		inputs[i].checked = false;}
		}


		setScore(score+points)
		navigate(`/quizpage/${level}/${minutes}/${macrons}`)

	}

	return (
		<div>
			{
				timeup? (<EndQuiz s={score}></EndQuiz>) :

					(<div id={'main'}>
						<p>Testing declensions {level}</p>
						<Timer initialSeconds={minutes*60} cb={handleCallback}></Timer>
						<p>Select all the options for the following ending.</p>
						<p>Total score: {score}</p>
						<button onClick={reset}>Start again</button>
						<div id={'questioncontainer'}>
							<div className={'question'}>{question}</div>
							<form ref={formData} onSubmit={onSubmit}>
								<div className={'answerbox'}>{options}</div>
								<button ref={submit} disabled>Submit</button>
							</form>
						</div>
						<div hidden={messageStatus} className={'message-popup'}>
							<h1>Points earned {points}</h1>
							{feedback}
						</div>
					</div>)
			}
		</div>
	);
}
