import React, { Component } from 'react';
import Chessboard from './Chessboard';
import DragMoveStart from './DragMoveStart';
import DragMoveEnd from './DragMoveEnd';
import PromotionDialogModal from './PromotionDialogModal';

const Chess = require('chess.js');

interface PendingMove {
    from: string,
    to: string,
}

export default class PlayableChessboard extends Component<{reversed: boolean, size: number, style: object}> {
    state = {
        gameLogic: new Chess(),
        promotionModalOpen: false,
        pendingMove: undefined as PendingMove,
    }

    render() {
        return (
        <>
        <Chessboard
            style={this.props.style}
            size={this.props.size}
            reversed={this.props.reversed}
            position={this.state.gameLogic.fen()}
            moveValidator={this.handleMove}
        ></Chessboard>
        <PromotionDialogModal
            whitePlayer={this.state.gameLogic.turn() !== 'b'}
            isOpen={this.state.promotionModalOpen}
            callback={this.handlePromotionValidation}
            dismissCallback={this.handleModalDismiss}
        ></PromotionDialogModal>
        </>);
    }

    private handleMove = (start: DragMoveStart, end: DragMoveEnd) => {
        const from = this.coordinateToAlgebraic(start.file, start.rank);
        const to = this.coordinateToAlgebraic(end.file, end.rank);
        const isPromotionMove = this.isPromotionMove(start, end);

        if (isPromotionMove) {
            this.setState({
                pendingMove: {
                    from, to
                },
                promotionModalOpen: true,
            });
            return;
        }
        const move = {
            from, to, promotion: undefined as string,
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

    private handlePromotionValidation = (pieceType: string) => {
        const gameLogicCopy = this.state.gameLogic;
        const promotion = pieceType;

        const move = {...this.state.pendingMove, promotion}

        gameLogicCopy.move(move);

        this.setState({
            promotionModalOpen: false,
            position: gameLogicCopy.fen(),
            pendingMove: undefined,
            gameLogic: gameLogicCopy,
        })
    }

    private handleModalDismiss = () => {
        this.setState({
            promotionModalOpen: false,
            pendingMove: undefined,
        });
    }

    private isPromotionMove = (start: DragMoveStart, end: DragMoveEnd) => {
        const isWhitePawn = start.piece === 'P';
        const isBlackPawn = start.piece === 'p';

        return (isWhitePawn && end.rank === 7) || (isBlackPawn && end.rank === 0); 
    }
}