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
		this.state.currentWord = [];
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

		var submittedWordsArray = [];
		this.state.submittedWords.map((word, index)=>{
			submittedWordsArray.push(
				<tr>
					<td>{word}</td>
					<td>{submittedScoreArray}</td>
				</tr>
			)
		})

		var submittedScoreArray = [];
		this.state.scoreArray.map((score, index)=>{
			submittedScoreArray.push(score)
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
					<tr>
						<th>Word</th>
						<th>Score</th>
					</tr>
					{submittedWordsArray}
					<tr>
						<th className="total">Total</th>
						{/*<th className="total">{totalSum}</th>*/}
					</tr>
				</table>
			</div>
		)
	}
}

export default Board;