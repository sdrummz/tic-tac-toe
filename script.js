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


    // adding event listener to each cell/square
    let square = document.querySelectorAll('.cell');
    square.forEach( el => {
        el.addEventListener('click', event => {
            console.log('click');
            assignMark(el.getAttribute('data-index'));
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

    return { updateBoard };

})();

const gameController = (() => {

    // two players
    const playerX = playerFactory('Player X', 'X');
    const playerO = playerFactory('Player O', 'O');

    // game starts with Player X
    let activePlayer = playerX;

    return { activePlayer };

})();