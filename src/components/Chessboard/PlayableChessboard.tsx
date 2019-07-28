import React, { Component } from 'react';
import Chessboard from './Chessboard';
import DragMoveStart from './DragMoveStart';
import DragMoveEnd from './DragMoveEnd';

const Chess = require('chess.js');

export default class PlayableChessboard extends Component<{reversed: boolean, size: number, style: object}> {
    state = {
        gameLogic: new Chess(),
    }

    render() {
        return (
        <Chessboard
            style={this.props.style}
            size={this.props.size}
            reversed={this.props.reversed}
            position={this.state.gameLogic.fen()}
            moveValidator={this.handleMove}
        ></Chessboard>);
    }

    private handleMove = (start: DragMoveStart, end: DragMoveEnd) => {
        const from = this.coordinateToAlgebraic(start.file, start.rank);
        const to = this.coordinateToAlgebraic(end.file, end.rank);
        const move = {
            from, to
        };
        const gameLogicCopy = this.state.gameLogic;
        const moveResults = gameLogicCopy.move(move);
        if (moveResults !== null){
            this.setState({
                position: gameLogicCopy.fen(),
                gameLogic: gameLogicCopy,
            });
        }
    }

    private coordinateToAlgebraic = (file: number, rank: number) => {
        const fileStr = String.fromCharCode('a'.charCodeAt(0) + file);
        const rankStr = String.fromCharCode('1'.charCodeAt(0) + rank);
        return `${fileStr}${rankStr}`;
    }
}