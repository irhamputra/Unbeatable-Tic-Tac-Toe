console.clear();

let origBoard;
const huPlayer = 'O';
const aiPlayer = 'X';
const winCombos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[6, 4, 2]
];

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
		// when start again display is none
		document.querySelector('.endgame')
				.style.display = 'none';
		
		// create board again from start
		origBoard = Array.from(Array(9).keys());
		// console.log(origBoard)
		
		// set every single cells to default value and clickable
		for (let i = 0; i < cells.length; i++) {
				cells[i].innerText = '';
				cells[i].style.removeProperty('background-color');
				cells[i].addEventListener('click', turnClick, false)
		}
}

function turnClick(square) {
		// console.log(square.target.id)
		if (typeof origBoard[square.target.id] == 'number'){
				turn(square.target.id, huPlayer);
				if (!checkTie()) turn(bestSpot(), aiPlayer);
		}
}

function turn(squareId, player) {
		origBoard[squareId] = player;
		
		// set value O or X depend on ID
		document.getElementById(squareId).innerText = player;
		
		let gameWon = checkWin(origBoard, player);
		if (gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
		let plays = board.reduce((acc, el, index) =>
				(el === player) ? acc.concat(index) : acc, []
		);
		
		let gameWon = null;
		
		for (let [index, win] of winCombos.entries()) {
				if (win.every(el => plays.indexOf(el) > -1)) {
						gameWon = {index: index, player: player};
						break;
				}
				
		}
		return gameWon
}

function gameOver(gameWon) {
		for (let index of winCombos[gameWon.index]) {
				document.getElementById(index)
						.style.backgroundColor = gameWon.player === huPlayer ? 'lightblue' : 'indianred'
		}
		
		for (let i = 0; i < cells.length; i++) {
				cells[i].removeEventListener('click', turnClick, false)
		}
		
		declareWinner(gameWon.player === huPlayer ? 'You win': 'You lose')
}

function declareWinner(who) {
		document.querySelector('.endgame')
				.style.display = 'block';
		document.querySelector('.endgame .text').innerText = who
}

function emptySquare() {
		return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() {
		return emptySquare()[0]
}

function checkTie() {
		if (emptySquare().length === 0){
				for (let i = 0; i < cells.length; i++) {
						cells[i].style.backgroundColor = 'lightgreen';
						cells[i].removeEventListener('click', turnClick, false)
				}
				
				declareWinner('Tie Game!');
				return true
		}
		
		return false
}
