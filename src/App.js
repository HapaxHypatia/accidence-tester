import logo from './logo.svg';
import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import React from "react";
import {Home, Quizpage} from './pages'
import Nav from "./components/nav";
import QuizSetup from "./pages/quizSetup";
import EndQuiz from "./pages/endQuiz";

function App() {
  return (
    <div id="App">
		<Nav/>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/index.html" element={<Home />} />
			<Route path="/end" element={<EndQuiz />} />
			<Route path="/quizSetup" element={<QuizSetup />} />
			<Route path="/quizpage/:level/:minutes" element={<Quizpage/>}/>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	</div>
  );
}

export default App;
