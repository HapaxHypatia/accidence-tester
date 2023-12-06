import logo from './logo.svg';
import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import React from "react";
import {Home, Quizpage} from './pages'
import Nav from "./components/nav";
import QuizSetup from "./pages/quizSetup";

function App() {
  return (
    <div id="App">
		<Nav/>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/quizSetup" element={<QuizSetup />} />
			<Route path="/quizpage/:level" element={<Quizpage/>}/>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	</div>
  );
}

export default App;
