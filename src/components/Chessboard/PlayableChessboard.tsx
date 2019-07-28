import React, { Component } from 'react';
import Chessboard from './Chessboard';
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
        ></Chessboard>);
    }
}