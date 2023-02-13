const player1 = "red";
const player2 = "yellow";
const aiPlayer = "aiplayer"
let currentPlayer = "player1";
let gameOver = false;
let columnTarget = [5,5,5,5,5,5,5]
const boardRows = 6;
const boardColumns = 7;
let board;
let restartButton = document.getElementsByClassName("restart-button")[0];


// Restart Button

function restartGame(){
    window.location.reload();
    console.log("restarting...")
}
restartButton.addEventListener("click", restartGame)

// Loading the game board
function boardLoad() {
    board = [];
    console.log("Starting board generation.")
        for (let indexRow = 0; indexRow < boardRows; indexRow++) {
            let row = [];
            for (let indexColumns = 0; indexColumns < boardColumns; indexColumns++) {
            row.push(" ");
            let coinSlot = document.createElement("div");
            coinSlot.id = indexRow.toString() + "-" + indexColumns.toString();
            coinSlot.classList.add("coin-slot");
            coinSlot.addEventListener("click", gamePiece);
            document.getElementById("gameBoard").append(coinSlot);
        }
        board.push(row);
    }
}
window.addEventListener("load", boardLoad);


// Putting the pieces together....
function gamePiece() {
    if (gameOver) return;

    let location = this.id.split("-");
    let indexRow = parseInt(location[0]);
    let indexColumns = parseInt(location[1]);

    indexRow = columnTarget[indexColumns];
    if (indexRow < 0) return;
    board[indexRow][indexColumns] = currentPlayer;
    let coinSlot = document.getElementById(indexRow.toString() + "-" + indexColumns.toString());

    if (currentPlayer == player1) {
        coinSlot.classList.add("player1");
        currentPlayer = player2;
    }
    else {
        coinSlot.classList.add("player2");
        currentPlayer = player1;
    }
    indexRow -= 1;
    columnTarget[indexColumns] = indexRow;

    winnerWinner();
} 


// Choosing a different game mode
function singlePlayer(event) {
    currentPlayer = event.target.value;
    console.log(event.target.value);
}
selectGamemode.addEventListener("change", singlePlayer);

// Winner Winner!

function winnerWinner() {
    for( let indexRow = 0; indexRow < boardRows - 3; indexRow++) {
        for( let indexColumns = 0; indexColumns < boardColumns; indexColumns++) {
            if (board[indexRow][indexColumns] != ' ') {
                if (board[indexRow][indexColumns] == board[indexRow + 1][indexColumns] && board[indexRow + 1][indexColumns] == 
                    board[indexRow + 2][indexColumns] && board[indexRow + 2][indexColumns] == board[indexRow + 3][indexColumns]) {
                        chickenDinner(indexRow,indexColumns);
                        console.log("Horizontal win")
                        return;
                }
            }
        }
    }
    for( let indexRow = 0; indexRow < boardRows; indexRow++) {
        for( let indexColumns = 0; indexColumns < boardColumns - 3; indexColumns++) {
            if (board[indexRow][indexColumns] != ' ') {
                if (board[indexRow][indexColumns] == board[indexRow][indexColumns + 1] && board[indexRow][indexColumns + 1] == 
                    board[indexRow][indexColumns + 2] && board[indexRow][indexColumns + 2] == board[indexRow][indexColumns + 3]) {
                        chickenDinner(indexRow,indexColumns);
                        console.log("Vertical win")
                        return;
                }
            }
        }
    }
    for( let indexRow = 0; indexRow < boardRows - 3; indexRow++) {
        for( let indexColumns = 0; indexColumns < boardColumns - 3; indexColumns++) {
            if (board[indexRow][indexColumns] != ' ') {
                if (board[indexRow][indexColumns] == board[indexRow + 1][indexColumns + 1] && board[indexRow + 1][indexColumns + 1] == 
                    board[indexRow + 2][indexColumns + 2] && board[indexRow + 2][indexColumns + 2] == board[indexRow + 3][indexColumns + 3]) {
                        chickenDinner(indexRow,indexColumns);
                        console.log("Forward diagonal win")
                        return;
                }
            }
        }
    }
    for ( let indexRow = 3; indexRow < boardRows; indexRow++) {
        for( let indexColumns = 0; indexColumns < boardColumns - 3; indexColumns++) {
            if (board[indexRow][indexColumns] != ' ') {
                if (board[indexRow][indexColumns] == board[indexRow -1][indexColumns + 1] && board[indexRow - 1][indexColumns + 1] == 
                    board[indexRow - 2][indexColumns + 2] && board[indexRow - 2][indexColumns + 2] == board[indexRow - 3][indexColumns + 3]) {
                        chickenDinner(indexRow,indexColumns);
                        console.log("Backwards diagonal win")
                        return;
                }
            }
        }
    }
}

function chickenDinner(indexRow,indexColumns) {
    if (board[indexRow][indexColumns] == player1) {
        alert("Congrats, Player 1 wins!!!");
    } else {
        alert("Congrats, Player 2 wins!!!");
    }
    gameOver = true;
    return;
}