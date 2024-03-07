import React, {useState} from "react";
import {useNavigate} from "react-router-dom";


function QuizSetup() {
	let nav = useNavigate()
	const [level, setLevel] = useState(['1','2','3','4','5'])
	const [minutes, setMinutes] = useState(5)

	function handleChangeDecl(e){
		e.preventDefault()
		let options = Array.from(e.target.selectedOptions, option => option.value)
		setLevel(options)

	}
	function handleChangeTime(e){
		e.preventDefault()
		setMinutes(e.target.value)

	}
	function handleSetup(e){
		e.preventDefault()
		console.log(level)
		let path = `/quizpage/${level}/${minutes}`
        nav(path)

	}

	return (
		<div id={'main'}>
			<p>QuizSetup</p>
			<label htmlFor={"noun-options"}>Which declensions?</label>
            <select onChange={handleChangeDecl} name="noun-options" id="noun-options" multiple>
				<option value={'5'}>5</option>
				<option value={'4'}>4</option>
				<option value={'3'}>3</option>
				<option value={'2'}>2</option>
				<option value={'1'}>1</option>
			</select>
			<p></p>
			<label htmlFor={"set-time"}>How many minutes?</label>
			<input type={"number"} width={"10"} onChange={handleChangeTime} name="set-time" id="set-time">
			</input>

			<button onClick={handleSetup}>Start</button>
		</div>
	);
}

export default QuizSetup;