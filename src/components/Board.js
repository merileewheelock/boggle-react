import React, { Component } from 'react';
import Dice from './Dice';

var dice = new Dice()

class Board extends Component{
	constructor(props){
		super(props);
		this.state = {
			diceArray: [],
			currentWord: [],
			displayWord: '',
			submittedWords: [],
			scoreArray: []
		}
		this.buildWord = this.buildWord.bind(this);
	}

	componentDidMount(){
		dice.createDice();
		var diceArray = dice.rolledDice;

		this.setState({
			diceArray: diceArray
		})
	}

	buildWord(value){
		// console.log(value)
		this.state.currentWord.push(value);
		var displayWord = this.state.currentWord.join('');
		this.setState({
			displayWord: displayWord
		})
	}

	clickSubmit(){

		this.state.submittedWords.push(this.state.displayWord)
		console.log(this.state.submittedWords)

		// Reset the scoreArray so the entire array isn't pushed each time
		this.setState({
			scoreArray: []
		})
		this.state.submittedWords.map((word, index)=>{
			if (word.length <= 2){
				this.state.scoreArray.push(0);
			}else if (word.length <= 4){
				this.state.scoreArray.push(1);
			}else if (word.length === 5){
				this.state.scoreArray.push(2);
			}else if (word.length === 6){
				this.state.scoreArray.push(3);
			}else if (word.length === 7){
				this.state.scoreArray.push(5);
			}else{
				this.state.scoreArray.push(11);
			}
		})
		console.log(this.state.scoreArray)

		// Resets current word
		this.setState({
			currentWord: [],
			displayWord: ''
		})
	}

	

	render(){

		var diceOnBoard = [];

		this.state.diceArray.map((die, index)=>{

			if (die === "Q"){
				die = "Qu";
			}

			diceOnBoard.push(
				<div className="dice" onClick={()=>this.buildWord(die)} key={index}>
					{die}
				</div>
			)
		})


		var submittedWordsHTML = [];
		this.state.submittedWords.map((word, index)=>{
			submittedWordsHTML.push(
				<tr key={index}>
					<td>{word}</td>
					<td>score</td>
				</tr>
			)
		})


		return(
			<div>
				<div className="board">
					{diceOnBoard}
				</div>
				<div>
					<span className="current-heading">Current Word: </span>
					<span>{this.state.displayWord}</span>
					<span className="submit-word">
						<button type="button" onClick={()=>this.clickSubmit()}>Submit Word</button>
					</span>
				</div>
				<table>
					<tbody>
						<tr>
							<th>Word</th>
							<th>Score</th>
						</tr>
						{submittedWordsHTML}
						<tr>
							<th className="total">Total</th>
							<th className="total">totalSum</th>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}

export default Board;