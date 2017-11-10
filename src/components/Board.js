import React, { Component } from 'react';
import Dice from './Dice';
import $ from 'jquery';

var dice = new Dice()

class Board extends Component{
	constructor(props){
		super(props);
		this.state = {
			diceArray: [],
			currentWord: [],
			displayWord: '',
			submittedWords: [],
			scoreArray: [],
			totalSum: 0,
			selectedIndexArray: []
		}
		this.clickLetter = this.clickLetter.bind(this);
		this.buildWord = this.buildWord.bind(this);
		// this.checkAdjacentLetters = this.checkAdjacentLetters.bind(this);
	}

	componentDidMount(){
		dice.createDice();
		var diceArray = dice.rolledDice;

		this.setState({
			diceArray: diceArray
		})
	}

	clickLetter(value, index){

		// Had to create lettersList to access the classes in each dice div
		var lettersList = $('.dice');

		if ($(lettersList[index]).hasClass('current')){
			$(lettersList[index]).removeClass('selected');
			$(lettersList[index]).removeClass('current');

			this.state.currentWord.pop();
			this.state.selectedIndexArray.pop();

			var previousLetterIndex = this.state.selectedIndexArray[this.state.selectedIndexArray.length-1];
			this.checkAdjacentLetters(previousLetterIndex, lettersList);
			$(lettersList[previousLetterIndex]).addClass('current');
			
			// Here instead of running buildWord(), which adds to the word, we are deleting from the word
			var tempCurrentWord = this.state.currentWord.join("");
			this.setState({
				displayWord: tempCurrentWord
			})

			// Allows user to keep playing after completely deleting the word
			if (this.state.currentWord.length === 0){
				$('.dice').removeClass('letter-off');
				// console.log("empty")
			}
			return
		}if ($(lettersList[index]).hasClass('letter-off')){
			// console.log("letter is not adjacent, cannot click")
			return
		}if ($(lettersList[index]).hasClass('selected')){
			// console.log("letter has already been selected, cannot click")
			return
		}
		this.buildWord(value)
		$('.current').removeClass('current') // Updates the current letter
		this.state.selectedIndexArray.push(index);
		this.checkAdjacentLetters(index, lettersList);
		$(lettersList[index]).addClass('selected');
		$(lettersList[index]).addClass('current');
	}

	buildWord(value){
		// This actually builds the word that is displayed on the screen
		this.state.currentWord.push(value);
		var displayWord = this.state.currentWord.join('');
		this.setState({
			displayWord: displayWord
		})
	}

	checkAdjacentLetters(index, lettersList){
		// console.log("current index: " + index)
		// console.log(lettersList)

		for (let i = 0; i < lettersList.length; i++){
			$(lettersList[i]).addClass('letter-off');
			$(lettersList[index]).removeClass('letter-off');
		}

		// Y Axis
		if (index <= 4){
			$(lettersList[index + 5]).removeClass('letter-off');
		}if ((index >= 5) && (index <= 19)){
			$(lettersList[index + 5]).removeClass('letter-off');
			$(lettersList[index - 5]).removeClass('letter-off');
		}if (index >= 20){
			$(lettersList[index - 5]).removeClass('letter-off');
		}

		// X Axis
		if ((index === 0) || (index === 5) || (index === 10) || (index === 15) || (index === 20)){
			$(lettersList[index + 1]).removeClass('letter-off');
		}if ((index === 1) || (index === 6) || (index === 11) || (index === 16) || (index === 21)){
			$(lettersList[index + 1]).removeClass('letter-off');
			$(lettersList[index - 1]).removeClass('letter-off');
		}if ((index === 2) || (index === 7) || (index === 12) || (index === 17) || (index === 22)){
			$(lettersList[index + 1]).removeClass('letter-off');
			$(lettersList[index - 1]).removeClass('letter-off');
		}if ((index === 3) || (index === 8) || (index === 13) || (index === 18) || (index === 23)){
			$(lettersList[index + 1]).removeClass('letter-off');
			$(lettersList[index - 1]).removeClass('letter-off');
		}if ((index === 4) || (index === 9) || (index === 14) || (index === 19) || (index === 24)){
			$(lettersList[index - 1]).removeClass('letter-off');
		}

		// Diagonals
		if ((index !== 4) && (index !== 9) && (index !== 14) && (index <= 19)){
			$(lettersList[index + 6]).removeClass('letter-off');
		}if ((index !== 0) && (index !== 5) && (index !== 10) && (index !== 15) && (index < 20)){
			$(lettersList[index + 4]).removeClass('letter-off');
		}if ((index > 5) && (index !== 10) && (index !== 15) && (index !== 20)){
			$(lettersList[index - 6]).removeClass('letter-off');
		}if ((index > 4) && (index !== 9) && (index !== 14) && (index !== 19) && (index !== 24)){
			$(lettersList[index - 4]).removeClass('letter-off');
		}
	}

	clickSubmit(){

		// This will prevent duplicate words from being submitted
		for (let i = 0; i < this.state.submittedWords.length; i++){
			if (this.state.displayWord === this.state.submittedWords[i]){
				return;
			}
		}

		this.state.submittedWords.push(this.state.displayWord)
		// console.log(this.state.submittedWords)

		// Count number of letters in word, counting "Qu" as two letters
		if (this.state.displayWord.length <= 2){
			this.state.scoreArray.push(0);
		}else if (this.state.displayWord.length <= 4){
			this.state.scoreArray.push(1);
		}else if (this.state.displayWord.length === 5){
			this.state.scoreArray.push(2);
		}else if (this.state.displayWord.length === 6){
			this.state.scoreArray.push(3);
		}else if (this.state.displayWord.length === 7){
			this.state.scoreArray.push(5);
		}else{
			this.state.scoreArray.push(11);
		}
		// console.log(this.state.scoreArray)

		// Resets current word
		this.setState({
			currentWord: [],
			displayWord: '',
			totalSum: this.state.scoreArray.reduce((a, b) => a + b, 0)
		})
		// To sum the values in an array: reduce method
		// array.reduce(function(total, currentValue, currentIndex, arr), initialValue)

		// Resets board
		$('.dice').removeClass('selected');
		$('.dice').removeClass('current');
		$('.dice').removeClass('letter-off');
	}

	render(){

		var diceOnBoard = [];
		this.state.diceArray.map((die, index)=>{
			if (die === "Q"){
				die = "Qu";
			}
			diceOnBoard.push(
				<div className="dice" onClick={()=>this.clickLetter(die, index)} key={index}>
					{die}
				</div>
			)
		})

		var submittedWordsHTML = [];
		this.state.submittedWords.map((word, index)=>{
			submittedWordsHTML.push(
				<tr key={index}>
					<td>{word}</td>
					<td>{this.state.scoreArray[index]}</td>
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
							<th className="total">{this.state.totalSum}</th>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}

export default Board;