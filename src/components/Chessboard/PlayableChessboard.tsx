import React, { Component } from 'react';
import Chessboard from './Chessboard';

export default class PlayableChessboard extends Component<{reversed: boolean, size: number, style: object}> {
    state = {
        position: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    }

    render() {
        return (
        <Chessboard
            style={this.props.style}
            size={this.props.size}
            reversed={this.props.reversed}
            position={this.state.position}
        ></Chessboard>);
    }
}