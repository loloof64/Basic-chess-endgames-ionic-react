import React, { Component, createRef } from "react";
import ChessboardEmptyCell from './ChessboardEmptyCell';
import ChessboardCell from './ChessboardCell';
import ChessboardCoord from './ChessboardCoord';
import ChessboardPlayerTurn from './ChessboardPlayerTurn';

interface DragStartInformations {
    col: number,
    row: number,
    pieceValue: string,
}

interface DragEndInformations {
    col: number,
    row: number,
}

export default class Chessboard extends Component<{position: string, reversed: boolean, size: number, style: object}> {

    clickLayer = createRef<HTMLDivElement>();

    state = {
        dragStart: undefined as DragStartInformations,
        dragEnd: undefined as DragEndInformations,
    };

    render() {
        const position = this.props.position;
        const pieces = this.getPiecesFromPosition(position);
        const whiteToPlay = position.split(" ")[1] === 'w';
        const reversed = this.props.reversed || false;
        const cellSize = this.props.size / 9.0;

        return (
            <div style={{...this.props.style, ...this.styles()[".board-root"]}}>
                <ChessboardEmptyCell></ChessboardEmptyCell>
                <ChessboardCoord key_value={'0_top'} value={reversed ? 'H' : 'A'} cellSize={cellSize}></ChessboardCoord>
                <ChessboardCoord key_value={'1_top'} value={reversed ? 'G' : 'B'} cellSize={cellSize}></ChessboardCoord>
                <ChessboardCoord key_value={'2_top'} value={reversed ? 'F' : 'C'} cellSize={cellSize}></ChessboardCoord>
                <ChessboardCoord key_value={'3_top'} value={reversed ? 'E' : 'D'} cellSize={cellSize}></ChessboardCoord>
                <ChessboardCoord key_value={'4_top'} value={reversed ? 'D' : 'E'} cellSize={cellSize}></ChessboardCoord>
                <ChessboardCoord key_value={'5_top'} value={reversed ? 'C' : 'F'} cellSize={cellSize}></ChessboardCoord>
                <ChessboardCoord key_value={'6_top'} value={reversed ? 'B' : 'G'} cellSize={cellSize}></ChessboardCoord>
                <ChessboardCoord key_value={'7_top'} value={reversed ? 'A' : 'H'} cellSize={cellSize}></ChessboardCoord>
                <ChessboardEmptyCell></ChessboardEmptyCell>

                {[0,1,2,3,4,5,6,7].map((row: number) => {
                    const rankCoordBase = reversed ? '1' : '8';
                    const rankCoord = String.fromCharCode(rankCoordBase.charCodeAt(0) + row);

                    return (
                        <React.Fragment key={row}>
                            <ChessboardCoord key_value={`${7-row}_left`} value={rankCoord} cellSize={cellSize}></ChessboardCoord>
                            <ChessboardCell key_value={`${7-row}0`} whiteCell={(row % 2) === 0} size={cellSize} 
                                isDndStartCell={this.isDndStartCell(row, 0)}
                                isDndEndCell={this.isDndEndCell(row, 0)}
                            ></ChessboardCell>
                            <ChessboardCell key_value={`${7-row}1`} whiteCell={(row % 2) !== 0} size={cellSize} 
                                isDndStartCell={this.isDndStartCell(row, 1)}
                                isDndEndCell={this.isDndEndCell(row, 1)}
                            ></ChessboardCell>
                            <ChessboardCell key_value={`${7-row}2`} whiteCell={(row % 2) === 0} size={cellSize} 
                                isDndStartCell={this.isDndStartCell(row, 2)}
                                isDndEndCell={this.isDndEndCell(row, 2)}
                            ></ChessboardCell>
                            <ChessboardCell key_value={`${7-row}3`} whiteCell={(row % 2) !== 0} size={cellSize} 
                                isDndStartCell={this.isDndStartCell(row, 3)}
                                isDndEndCell={this.isDndEndCell(row, 3)}
                            ></ChessboardCell>
                            <ChessboardCell key_value={`${7-row}4`} whiteCell={(row % 2) === 0} size={cellSize} 
                                isDndStartCell={this.isDndStartCell(row, 4)}
                                isDndEndCell={this.isDndEndCell(row, 4)}
                            ></ChessboardCell>
                            <ChessboardCell key_value={`${7-row}5`} whiteCell={(row % 2) !== 0} size={cellSize} 
                                isDndStartCell={this.isDndStartCell(row, 5)}
                                isDndEndCell={this.isDndEndCell(row, 5)}
                            ></ChessboardCell>
                            <ChessboardCell key_value={`${7-row}6`} whiteCell={(row % 2) === 0} size={cellSize} 
                                isDndStartCell={this.isDndStartCell(row, 6)}
                                isDndEndCell={this.isDndEndCell(row, 6)}
                            ></ChessboardCell>
                            <ChessboardCell key_value={`${7-row}7`} whiteCell={(row % 2) !== 0} size={cellSize} 
                                isDndStartCell={this.isDndStartCell(row, 7)}
                                isDndEndCell={this.isDndEndCell(row, 7)}
                            ></ChessboardCell>
                            <ChessboardCoord key_value={`${7-row}_right`} value={rankCoord} cellSize={cellSize}></ChessboardCoord>
                        </React.Fragment>
                    );
                })}

                <ChessboardEmptyCell></ChessboardEmptyCell>
                <ChessboardCoord key_value={'0_bottom'} value={reversed ? 'H' : 'A'} cellSize={cellSize}></ChessboardCoord>
                <ChessboardCoord key_value={'1_bottom'} value={reversed ? 'G' : 'B'} cellSize={cellSize}></ChessboardCoord>
                <ChessboardCoord key_value={'2_bottom'} value={reversed ? 'F' : 'C'} cellSize={cellSize}></ChessboardCoord>
                <ChessboardCoord key_value={'3_bottom'} value={reversed ? 'E' : 'D'} cellSize={cellSize}></ChessboardCoord>
                <ChessboardCoord key_value={'4_bottom'} value={reversed ? 'D' : 'E'} cellSize={cellSize}></ChessboardCoord>
                <ChessboardCoord key_value={'5_bottom'} value={reversed ? 'C' : 'F'} cellSize={cellSize}></ChessboardCoord>
                <ChessboardCoord key_value={'6_bottom'} value={reversed ? 'B' : 'G'} cellSize={cellSize}></ChessboardCoord>
                <ChessboardCoord key_value={'7_bottom'} value={reversed ? 'A' : 'H'} cellSize={cellSize}></ChessboardCoord>
                <ChessboardPlayerTurn whiteToPlay={whiteToPlay} cellSize={cellSize}></ChessboardPlayerTurn>


                {
                    this.generateDndEndCellGuides()
                }
                {[0,1,2,3,4,5,6,7].map((row: number) => {
                    return [0,1,2,3,4,5,6,7].map((col: number) => {
                        return this.generatePiece(`piece_${row}${col}`, row, col, pieces, reversed);
                    });
                })}
                {
                    this.generateDndMovedPiece()
                }
                <div 
                    style={this.styles()[".board-interactive-layer"]}
                    onTouchStart={this.handleDragStart}
                    onTouchMove={this.handleDragMove}
                    onTouchEnd={this.handleDragEnd}
                    ref={this.clickLayer}
                ></div>
            </div>
        )
    }

    private isDndStartCell = (row: number, col: number) => {
        const dndStart = this.state.dragStart;
        if (dndStart === undefined) return false;
        return row === dndStart.row && col === dndStart.col;
    }

    private isDndEndCell = (row: number, col: number) => {
        const dndEnd = this.state.dragEnd;
        if (dndEnd === undefined) return false;
        return row === dndEnd.row && col === dndEnd.col;
    }

    private generatePiece = (key: string, row: number, col: number, pieces: string[][],
        reversed: boolean) => {
        const value = pieces[reversed ? (7-row) : row][reversed ? (7-col) : col];
        const piecePath = this.getPiecePath(value);

        let pieceElement;
        
        const dndStart = this.state.dragStart;
        const isDndStartCell = dndStart !== undefined &&
            dndStart.col === col &&
            dndStart.row === row;

        if (isDndStartCell) {
            pieceElement = undefined;
        }
        else if (piecePath === undefined) {
            pieceElement = undefined;
        }
        else {
            const cellsSize = this.props.size / 9.0;
            const sizeString = `${cellsSize}px`;

            const left = cellsSize * (col + 0.5);
            const top = cellsSize * (row + 0.5);

            pieceElement = (
                <img
                    key={key}
                    src={piecePath} 
                    width={sizeString} 
                    height={sizeString} 
                    alt="piece"
                    style={{
                        'position': "absolute",
                        'left': `${left}px`,
                        'top': `${top}px`,
                    }}
                >
                </img>
            )
        }

        return pieceElement;
    }

    private generateDndEndCellGuides = () => {
        const dndEndCellSelected = this.state.dragEnd !== undefined;
        if (dndEndCellSelected) {
            const cellsSize = this.props.size / 9.0;
            const thickness = cellsSize * 0.3;
            const length = cellsSize * 8;

            const horizontalTop = cellsSize * (this.state.dragEnd.row+1) - thickness * 0.5;
            const horizontalLeft = cellsSize * 0.5;
            const verticalLeft = cellsSize * (this.state.dragEnd.col+1) - thickness * 0.5;
            const verticalTop = cellsSize * 0.5;

            const horizontalLine = (<div key='dnd_guide_horiz' style={{
                'position': 'absolute',
                'top': `${horizontalTop}px`,
                'left': `${horizontalLeft}px`,
                'width': `${length}px`,
                'height': `${thickness}px`,
                'backgroundColor': '#5D30B0',
            }}></div>);

            const verticalLine = (<div key='dnd_guide_verti' style={{
                'position': 'absolute',
                'top': `${verticalTop}px`,
                'left': `${verticalLeft}px`,
                'width': `${thickness}px`,
                'height': `${length}px`,
                'backgroundColor': '#5D30B0',
            }}></div>);

            return [
                horizontalLine,
                verticalLine,
            ];
        }
    }

    private generateDndMovedPiece = () => {
        const dndStarted = this.state.dragStart !== undefined;
        const dragMoveStarted = this.state.dragEnd !== undefined;
        if (dndStarted && dragMoveStarted) {
            const dragStart = this.state.dragStart;
            const dragEnd = this.state.dragEnd;
            const piecePath = this.getPiecePath(dragStart.pieceValue);

            const cellsSize = this.props.size / 9.0;
            const sizeString = `${cellsSize}px`;

            const left = cellsSize * (dragEnd.col + 0.5);
            const top = cellsSize * (dragEnd.row + 0.5);

            return (
                <img
                    key={`moved_piece`}
                    src={piecePath} 
                    width={sizeString} 
                    height={sizeString} 
                    alt="piece"
                    style={{
                        'position': "absolute",
                        'left': `${left}px`,
                        'top': `${top}px`,
                        'opacity': 0.7,
                    }}
                >
                </img>
            )
        }
    }

    private getPiecePath = (value: any) => {
        let typeString;
        switch (value) {
            case 'P': typeString = 'pl'; break;
            case 'N': typeString = 'nl'; break;
            case 'B': typeString = 'bl'; break;
            case 'R': typeString = 'rl'; break;
            case 'Q': typeString = 'ql'; break;
            case 'K': typeString = 'kl'; break;
            case 'p': typeString = 'pd'; break;
            case 'n': typeString = 'nd'; break;
            case 'b': typeString = 'bd'; break;
            case 'r': typeString = 'rd'; break;
            case 'q': typeString = 'qd'; break;
            case 'k': typeString = 'kd'; break;
            default: return undefined;
        }
        return `/assets/vectors/Chess_${typeString}t45.svg`;
    }

    private getPiecesFromPosition = (position: string) => {
        const lines = position.split(' ')[0].split('/');
        return lines.map((currentLine, lineIndex) => {
            let linePieces: any[] = [];
            let col = 0;
            let pointer = 0;
            while (col < 8){
                const currentElement = currentLine.charAt(pointer);
                const isDigit = currentElement.charCodeAt(0) >= '0'.charCodeAt(0) &&
                    currentElement.charCodeAt(0) <= '9'.charCodeAt(0);
                if (isDigit){
                    const digit = currentElement.charCodeAt(0) - '0'.charCodeAt(0);
                    for (let i = 0; i < digit; i++) {
                        linePieces.push(undefined);
                    }
                    col += digit;
                }
                else {
                    linePieces.push(currentElement);
                    col++;
                }
                pointer++;
            }
            return linePieces;
        });
    }

    private handleDragStart = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        const boardRawCoordinates = this.touchEventToBoardRawCoordinate(event);

        if (boardRawCoordinates !== undefined) {
            const allPiecesValues = this.getPiecesFromPosition(this.props.position);
            const rank = this.props.reversed ? (7-boardRawCoordinates.row) : boardRawCoordinates.row;
            const file = this.props.reversed ? (7-boardRawCoordinates.col) : boardRawCoordinates.col;

            const pieceValue = allPiecesValues[rank][file];
            const isLegalPieceValue = 'PNBRQKpnbrqk'.split('').includes(pieceValue);

            if ( ! isLegalPieceValue ) return;

            const isWhiteToPlay = this.props.position.split(' ')[1] === 'w';
            const isPieceOfPlayerTurn = isWhiteToPlay ?
                (pieceValue.charCodeAt(0) >= 'A'.charCodeAt(0) && pieceValue.charCodeAt(0) <= 'Z'.charCodeAt(0)) :
                (pieceValue.charCodeAt(0) >= 'a'.charCodeAt(0) && pieceValue.charCodeAt(0) <= 'z'.charCodeAt(0));

            if (isPieceOfPlayerTurn){
                this.setState({
                    dragStart: {
                        ...boardRawCoordinates,
                        pieceValue,
                    }
                })
            }
        }
    }

    private handleDragEnd = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({
            dragStart: undefined,
            dragEnd: undefined,
        })
    }

    private handleDragMove = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        const dndStarted = this.state.dragStart !== undefined;
        if (dndStarted) {
            const boardRawCoordinates = this.touchEventToBoardRawCoordinate(event);
            const boardRawCoordinatesInBounds = 
                boardRawCoordinates !== undefined &&
                boardRawCoordinates.col >= 0 && boardRawCoordinates.col <= 7 &&
                boardRawCoordinates.row >= 0 && boardRawCoordinates.row <= 7;
                
            if (boardRawCoordinatesInBounds) {
                this.setState({
                    dragEnd: boardRawCoordinates,
                })
            }
            else {
                // cancel drag n drop
                this.setState({
                    dragStart: undefined,
                    dragEnd: undefined,
                })
            }
        }
    }

    private touchEventToBoardRawCoordinate = (event: any) => {
        const cellSize = (this.props.size / 9.0);
        const halfCellSize = cellSize / 2.0;

        const eventTouch = event.touches[0];

        const clickLayer = this.clickLayer.current;
        const clickBounds = clickLayer.getBoundingClientRect();

        const col = Math.floor((eventTouch.clientX - clickBounds.left - halfCellSize) / cellSize);
        const row = Math.floor((eventTouch.clientY - clickBounds.top - halfCellSize) / cellSize);

        return {col, row};
    }

    private styles = () => {
        const size = this.props.size;
        const sizeString = `${size}px`;

        return {
            ".board-root": {
                'display': 'grid',
                'gridTemplate': '1fr repeat(8, 2fr) 1fr / 1fr repeat(8, 2fr) 1fr',
                'width': sizeString,
                'height': sizeString,
            } as React.CSSProperties,
            ".board-interactive-layer": {
                position: 'absolute',
                'width': sizeString,
                'height': sizeString,
            } as React.CSSProperties,
        }
    }
}