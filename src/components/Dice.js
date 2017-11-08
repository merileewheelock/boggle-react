class Dice{
	constructor(){
		this.randomDice = [];
		this.rolledDice = [];
	}

	createDice(){
		// Create and Shuffle
		var diceArray = [
			"aaafrs",
			"aaeeee",
			"aafirs",
			"adennn",
			"aeeeem",
			"aeegmu",
			"aegmnn",
			"afirsy",
			"bjkqxz",
			"ccenst",
			"ceiilt",
			"ceilpt",
			"ceipst",
			"ddhnot",
			"dhhlor",
			"dhlnor",
			"dhlnor",
			"eiiitt",
			"emottt",
			"ensssu",
			"fiprsy",
			"gorrvw",
			"iprrry",
			"nootuw",
			"ooottu"
		]
		var copyDice = diceArray.slice();

		// Randomize dice
		for (let i = 0; i < diceArray.length; i++){
			var randNum = Math.floor(Math.random() * copyDice.length);
			this.randomDice.push(copyDice.splice(randNum,1)[0]);
		}
		// console.log(this.randomDice)

		// Roll individual dice
		for (let i = 0; i < diceArray.length; i++){
			randNum = Math.floor(Math.random() * 6);
			this.rolledDice.push(this.randomDice[i].toUpperCase().split('').slice(randNum, randNum+1).toString());
		}
		// console.log(this.rolledDice)
		return this.rolledDice;
	}
}

export default Dice;