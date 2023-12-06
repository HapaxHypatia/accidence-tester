import React, {useState} from "react";
import {useNavigate} from "react-router-dom";


function QuizSetup() {
	let nav = useNavigate()
	const [level, setLevel] = useState(5)
	function handleChange(e){
		e.preventDefault()
		let lev = e.target.value
		setLevel(parseInt(lev))
	}
	function handleSetup(e){
		e.preventDefault()
		console.log("Enter handler function")
		console.log(level)
		let path = `/quizpage/${level}`
        nav(path)

	}

	return (
		<div id={'main'}>
			<p>QuizSetup</p>
			<label for={"noun-options"}>How many declensions do you want to test?</label>
            <select onChange={handleChange} name="noun-options" id="noun-options">
				<option value={'5'}>5</option>
				<option value={'4'}>4</option>
				<option value={'3'}>3</option>
				<option value={'2'}>2</option>
				<option value={'1'}>1</option>
			</select>
			<button onClick={handleSetup}>Start</button>
		</div>
	);
}

export default QuizSetup;