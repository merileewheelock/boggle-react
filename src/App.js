import React, { Component } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import CurrentWord from './components/CurrentWord';
import ScoreTable from './components/ScoreTable';

class App extends Component {
	render() {
		return (
			<div className="container main-boggle">
				<Header />
                <Board />
                <CurrentWord />
                <ScoreTable />
			</div>
		);
	}
}

export default App;
