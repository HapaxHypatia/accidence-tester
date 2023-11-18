import logo from './logo.svg';
import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom';
import React from "react";
import {Home, Quizpage} from './pages'
import Nav from "./components/nav";

function App() {
  return (
    <div id="App">
		<Nav/>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="quizpage" element={<Quizpage />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	</div>
  );
}

export default App;
