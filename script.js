'use strict'

const playerFactory = (player, mark) => {
    return { player, mark };
}

const gameBoard = (() => {
    // this module sets the gameboard, and functions to set, get, and reset the game
    let board = ['', '', '', '', '', '', '', '', ''];


    return { board }

})();

const displayController = (() => {

    // render the gameboard
    let cells = document.querySelector('.cells');
    gameBoard.board.forEach( (el, i) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cells.appendChild(cell);
    })


    // adding event listener to each cell/square, and logic following click
    let square = document.querySelectorAll('.cell');
    square.forEach( el => {
        el.addEventListener('click', () => {
            // only add players mark on empty cell
            if (gameController.gameActive) {
                if (gameBoard.board[el.getAttribute('data-index')] === '') {
                    assignMark(el.getAttribute('data-index'));
                    gameController.checkWinner();
                    gameController.switchPlayer();
                }
            }
            
        })
    })

    // function adds correct sign to gameboard array
    const assignMark = (index) => {
        gameBoard.board[index] = gameController.activePlayer.mark;
        updateBoard();
    }

    // update the gameboard contents from gameboard array
    const updateBoard = () => {
        const chosenCell = document.querySelectorAll('.cell');
        for (let i = 0; i < gameBoard.board.length; i++) {
            chosenCell[i].textContent = gameBoard.board[i];
        }
    }

    // highlight winning cells after win, based on winCells from winConditions array
    const highlightWin = () => {
        square[gameController.winCells[0]].classList.add('win-cell');
        square[gameController.winCells[1]].classList.add('win-cell');
        square[gameController.winCells[2]].classList.add('win-cell');

    }

    return { updateBoard, highlightWin };

})();

const gameController = (() => {

    // two players
    const playerX = playerFactory('Player X', 'X');
    const playerO = playerFactory('Player O', 'O');

    // game starts with Player X
    let activePlayer = playerX;
    let gameActive = true;
    let winCells = [];


    // function switches active player following move
    const switchPlayer = () => {
        if (gameController.activePlayer === playerX) {
            gameController.activePlayer = playerO;
        } else if (gameController.activePlayer === playerO) {
            gameController.activePlayer = playerX;
        }
    }

    // win condition indexes
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const checkWinner = () => {
        winConditions.forEach( (el, i) => {
            if (gameBoard.board[el[0]] === activePlayer.mark
                && gameBoard.board[el[1]] === activePlayer.mark
                && gameBoard.board[el[2]] === activePlayer.mark) {
                    console.log(`${activePlayer.player} wins!`)

                    // freeze game after win until restart
                    gameController.gameActive = false;   
                    
                    // set winning cells to be highlighted
                    gameController.winCells = el;

                    displayController.highlightWin();
                }
        }) 
    }

    return { activePlayer, gameActive, winCells, switchPlayer, checkWinner };

})();