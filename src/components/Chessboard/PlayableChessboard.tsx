import React, { Component } from 'react';
import { IonToast } from '@ionic/react';
import Chessboard from './Chessboard';
import DragMoveStart from './DragMoveStart';
import DragMoveEnd from './DragMoveEnd';
import PromotionDialogModal from './PromotionDialogModal';
import ChessEngineCommunication from '../../services/ChessEngineCommunication';

const Chess = require('chess.js');

interface PendingMove {
    from: string,
    to: string,
}

export default class PlayableChessboard extends Component<{reversed: boolean, size: number, style: object}> {
    engineCommunicationLayer: ChessEngineCommunication;

    state = {
        gameLogic: new Chess(),
        promotionModalOpen: false,
        pendingMove: undefined as PendingMove,
        showGameEndedToast: false,
        gameEndedMessage: undefined as string,
        gameInProgress: true,
    }

    constructor(props: any) {
        super(props);
        this.engineCommunicationLayer = new ChessEngineCommunication(
            this.handleEngineOutput
        );
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
                gameInProgress={this.state.gameInProgress}
            ></Chessboard>
            <PromotionDialogModal
                whitePlayer={this.state.gameLogic.turn() !== 'b'}
                isOpen={this.state.promotionModalOpen}
                callback={this.handlePromotionValidation}
                dismissCallback={this.handleModalDismiss}
            ></PromotionDialogModal>
            <IonToast
                isOpen={this.state.showGameEndedToast}
                onDidDismiss={this.handleGameEndedToastDismiss}
                message={this.state.gameEndedMessage}
                duration={800}
            ></IonToast>
        </>);
    }

    private handleEngineOutput = (line: string) => {
        console.log(line);
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

            this.notifyGameEndedIfAppropriate();
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

        this.notifyGameEndedIfAppropriate();
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

    private notifyGameEndedIfAppropriate = () => {
        const isMate = this.state.gameLogic.in_checkmate();
        const isDrawByStalemate = this.state.gameLogic.in_stalemate();
        const isDrawByThreeFoldRepetitions = this.state.gameLogic.in_threefold_repetition();
        const isDrawByInsufficientMaterial = this.state.gameLogic.insufficient_material();
        const isDrawByFiftyMovesRule = 
            this.state.gameLogic.in_draw() &&
            ! this.state.gameLogic.insufficient_material();

        if (isMate) {
            const whiteWinner = this.state.gameLogic.turn() === 'b';
            const message = `The ${whiteWinner ? 'Whites' : 'Blacks'} wins !`;
            this.setState({
                showGameEndedToast: true,
                gameEndedMessage: message,
                gameInProgress: false,
            });
        }
        else if (isDrawByStalemate) {
            const message = 'Draw by stalemate';
            this.setState({
                showGameEndedToast: true,
                gameEndedMessage: message,
                gameInProgress: false,
            });
        }
        else if (isDrawByThreeFoldRepetitions) {
            const message = 'Draw by three fold repetitions';
            this.setState({
                showGameEndedToast: true,
                gameEndedMessage: message,
                gameInProgress: false,
            });
        }
        else if (isDrawByInsufficientMaterial) {
            const message = 'Draw by insufficient material';
            this.setState({
                showGameEndedToast: true,
                gameEndedMessage: message,
                gameInProgress: false,
            });
        }
        else if (isDrawByFiftyMovesRule) {
            const message = 'Draw by 50 moves rule';
            this.setState({
                showGameEndedToast: true,
                gameEndedMessage: message,
                gameInProgress: false,
            });
        }
    }

    private handleGameEndedToastDismiss = () => {
        this.setState({
            showGameEndedToast: false,
            gameEndedMessage: undefined,
        });
    }
}