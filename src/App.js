import React, { Component } from 'react';
import Header from './components/Header';
import Board from './components/Board';

class App extends Component {
	render() {
		return (
			<div className="container main-boggle">
				<Header />
                <Board />
			</div>
		);
	}
}

export default App;
