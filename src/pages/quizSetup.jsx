import React, {useState} from "react";
import {useNavigate} from "react-router-dom";


function QuizSetup() {
	let nav = useNavigate()
	const [level, setLevel] = useState(['1','2','3','4','5'])
	const [minutes, setMinutes] = useState(5)
	const [macrons, setMacrons] = useState('false')

	function handleChangeDecl(e){
		e.preventDefault()
		let options = Array.from(e.target.selectedOptions, option => option.value)
		setLevel(options)

	}
	function handleChangeTime(e){
		e.preventDefault()
		setMinutes(e.target.value)

	}
	function handleChangeMacrons(e){
		e.preventDefault()
		setMacrons(e.target.checked)
	}


	function handleSetup(e){
		e.preventDefault()
		let path = `/quizpage/${level}/${minutes}/${macrons}`
        nav(path)

	}

	return (
		<div id={'main'}>
			<p>QuizSetup</p>
			&nbsp;&nbsp;&nbsp;
			<label htmlFor={"noun-options"}>Which declensions?</label>
            <select onChange={handleChangeDecl} name="noun-options" id="noun-options">
				<option value={'5'}>5</option>
				<option value={'4'}>4</option>
				<option value={'3'}>3</option>
				<option value={'2'}>2</option>
				<option value={'1'}>1</option>
			</select>
			&nbsp;&nbsp;&nbsp;
			<label htmlFor={"set-time"}>How many minutes?</label>
			<input type={"number"} onChange={handleChangeTime} max={999} min={0}/>
			&nbsp;&nbsp;&nbsp;
			<label htmlFor={"set-macrons"}>Use macrons?
				<input type={"radio"} name={"set-macrons"} onChange={handleChangeMacrons}/>
			</label>

			<button onClick={handleSetup}>Start</button>
		</div>
	);
}

export default QuizSetup;