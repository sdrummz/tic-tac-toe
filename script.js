'use strict'

const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    let cells = document.querySelector('.cells');
    board.forEach( el => {
        const cell = document.createElement('div');
        cells.appendChild(cell);
        cell.classList.add('cell');

    })
})();