import React, { Component } from 'react';
import Dice from './Dice';

var dice = new Dice()

class Board extends Component{
	constructor(props){
		super(props);
		this.state = {
			diceArray: []
		}
	}

	

	componentDidMount(){
		dice.createDice();
		var diceArray = dice.rolledDice;
		console.log(diceArray);
		this.setState({
			diceArray: diceArray
		})
	}

	render(){

		var gridSize = 25;
		var diceOnBoard = [];

		console.log(this.state.diceArray)

		this.state.diceArray.map((die, index)=>{

			if (die == "Q"){
				die = "Qu";
			}

			diceOnBoard.push(
				<div className="dice" key={index}>
					{die}
				</div>
			)
		})

		return(
			<div className="board">
				{diceOnBoard}
			</div>
		)
	}
}

export default Board;