import React from "react";
import {Link} from "react-router-dom";

function Nav() {
	return (
		<nav>
			<Link to={'/'}>Home</Link>
			<Link to={'/quizpage'}>Quiz</Link>
		</nav>
	);
}

export default Nav;