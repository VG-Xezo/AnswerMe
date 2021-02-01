import React from 'react'
import Header from "./components/Header"
import SubmitQuestion from "./components/SubmitQuestion"
import Posts from "./components/Posts"
import Question from "./components/Question"
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";

function App() {
	return (
		<div>
			<Router>
				<Switch>
					<Route exact path="/">
						<Header />
						<SubmitQuestion />
						<Posts />
					</Route>
					<Route path="/question/:id" children={<Question />} />
				</Switch>
			</Router>
		</div>
	)
}

export default App
