import React, { Component, CSSProperties, createRef } from "react";

interface DragStartInformations {
    col: number,
    row: number,
    pieceValue: string,
}

interface DragEndInformations {
    col: number,
    row: number,
}

export default class Chessboard extends Component {

    props: any;
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

        return (
            <div style={{...this.props.style, ...this.styles()[".board-root"]}}>
                {[0,1,2,3,4,5,6,7,8,9].map((row: number) => {
                    return [0,1,2,3,4,5,6,7,8,9].map((col: number) => {
                        return this.generateCell(row, col, whiteToPlay, reversed);
                    });
                })}
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
                    onMouseDown={this.handleDragStart}
                    onMouseUp={this.handleDragEnd}
                    onMouseMove={this.handleDragMove}
                    ref={this.clickLayer}
                ></div>
            </div>
        )
    }

    private generateCell = (row: number, col: number,
         whiteToPlay: boolean, reversed: boolean) => {
        const key = `${row}${col}`;
        if (row === 0 || row === 9) {
            if (col >= 1 && col <= 8) {
                return this.generateFileCoordinate(key, col, reversed);
            }
            else if (row === 9 && col === 9) {
                return this.generatePlayerTurn(key, whiteToPlay);
            }
        }
        else {
            if (col === 0 || col === 9) {
                return this.generateRankCoordinate(key, row, reversed);
            }
            else {
                return this.generateRegularCell(key, row, col, reversed);
            }
        }
        return (
            <div key={key} style={this.styles()[".empty-zone"]}></div>
        );
    }

    private generateFileCoordinate = (key: string, col: number, reversed: boolean) => {
        const valueString = String.fromCharCode('A'.charCodeAt(0) + (reversed ? (8-col) : (col - 1)));
        return (<div key={key} style={this.styles()[".coord"]}>{valueString}</div>);
    }

    private generateRankCoordinate = (key: string, row: number, reversed: boolean) => {
        const valueString = String.fromCharCode('1'.charCodeAt(0) + (reversed ? (row - 1) : (8 - row)));
        return (<div key={key} style={this.styles()[".coord"]}>{valueString}</div>);
    }

    private generateRegularCell = (key: string, row: number, col: number, 
        reversed: boolean) => {
        const isWhiteCell = (row + col) % 2 === 0;
        let style = isWhiteCell ? this.styles()['.white-cell'] : this.styles()['.black-cell'];

        const dragStart = this.state.dragStart;
        if (dragStart !== undefined && dragStart.col === col && dragStart.row === row){
            style = this.styles()['.drag-start-cell']
        }

        const dragEnd = this.state.dragEnd;
        if (dragEnd !== undefined && dragEnd.col === col && dragEnd.row === row){
            style = this.styles()['.drag-end-cell']
        }

        return (<div key={key} style={style}></div>)
    }

    private generatePlayerTurn = (key: string, whiteToPlay: boolean) => {
        return (
            <div key={key} style={this.styles()['.empty-zone']}>
                <div style={this.styles()[whiteToPlay ? '.turn-white' : '.turn-black']}></div>
            </div>
        )
    }

    private generatePiece = (key: string, row: number, col: number, pieces: string[][],
        reversed: boolean) => {
        const value = pieces[reversed ? (7-row) : row][reversed ? (7-col) : col];
        const piecePath = this.getPiecePath(value);

        let pieceElement;
        
        const dndStart = this.state.dragStart;
        const isDndStartCell = dndStart !== undefined &&
            dndStart.col === col+1 &&
            dndStart.row === row+1;

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

            const horizontalTop = cellsSize * (this.state.dragEnd.row) - thickness * 0.5;
            const horizontalLeft = cellsSize * 0.5;
            const verticalLeft = cellsSize * (this.state.dragEnd.col) - thickness * 0.5;
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

            const left = cellsSize * (dragEnd.col - 0.5);
            const top = cellsSize * (dragEnd.row - 0.5);

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
        const boardRawCoordinates = this.mouseEventToBoardRawCoordinate(event);
        if (boardRawCoordinates !== undefined) {
            const allPiecesValues = this.getPiecesFromPosition(this.props.position);
            const rank = this.props.reversed ? (8-boardRawCoordinates.row) : boardRawCoordinates.row-1;
            const file = this.props.reversed ? (8-boardRawCoordinates.col) : boardRawCoordinates.col-1;

            console.log(rank, file);

            const pieceValue = allPiecesValues[rank][file];
            this.setState({
                dragStart: {
                    ...boardRawCoordinates,
                    pieceValue,
                }
            })
        }
    }

    private handleDragEnd = (event: any) => {
        this.setState({
            dragStart: undefined,
            dragEnd: undefined,
        })
    }

    private handleDragMove = (event: any) => {
        const dndStarted = this.state.dragStart !== undefined;
        if (dndStarted) {
            const boardRawCoordinates = this.mouseEventToBoardRawCoordinate(event);
            const boardRawCoordinatesInBounds = 
                boardRawCoordinates !== undefined &&
                boardRawCoordinates.col >= 1 && boardRawCoordinates.col <= 8 &&
                boardRawCoordinates.row >= 1 && boardRawCoordinates.row <= 8;
                
            if (boardRawCoordinatesInBounds) {
                this.setState({
                    dragEnd: boardRawCoordinates,
                })
            }
        }
    }

    private mouseEventToBoardRawCoordinate = (event: any) => {
        const cellSize = (this.props.size / 9.0);
        const halfCellSize = cellSize / 2.0;
        const clickLayer = this.clickLayer.current!;
        if (clickLayer) {
            const clickLayerBoundingRect = clickLayer.getBoundingClientRect();
            const clickLayerX = clickLayerBoundingRect.left;
            const clickLayerY = clickLayerBoundingRect.top;
            const col = Math.floor((event.clientX - clickLayerX - halfCellSize) / cellSize) + 1;
            const row = Math.floor((event.clientY - clickLayerY - halfCellSize) / cellSize) + 1;

            return {col, row};
        }
        else return undefined;
    }

    private styles = () => {
        const size = this.props.size;
        const sizeString = `${size}px`;
        const cellSizeString = `${size / 18.0}px`;
        const fontSize = Math.ceil(size * 0.05);

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
            ".empty-zone": {
                'backgroundColor': '#120D48',
            } as React.CSSProperties,
            ".white-cell": {
                'display': 'flex',
                'justifyContent': 'center',
                'alignItems': 'center',
                'backgroundColor': '#CA9326',
            } as React.CSSProperties,
            ".black-cell": {
                'display': 'flex',
                'justifyContent': 'center',
                'alignItems': 'center',
                'backgroundColor': '#482D0D',
            } as React.CSSProperties,
            ".drag-start-cell": {
                'display': 'flex',
                'justifyContent': 'center',
                'alignItems': 'center',
                'backgroundColor': '#34DD34',
            } as React.CSSProperties,
            ".drag-end-cell": {
                'display': 'flex',
                'justifyContent': 'center',
                'alignItems': 'center',
                'backgroundColor': '#5D30B0',
            } as React.CSSProperties,
            ".coord": {
                'display': 'flex',
                'justifyContent': 'center',
                'alignItems': 'center',
                'backgroundColor': '#120D48',
                'color': '#DADF48',
                'fontWeight': 'bold',
                'fontSize': `${fontSize}px`, 
            } as React.CSSProperties,
            ".turn-white": {
                'display': 'flex',
                'justifyContent': 'center',
                'alignItems': 'center',
                'borderRadius': '100%',
                'backgroundColor': '#FFF',
                'width': cellSizeString,
                'height': cellSizeString,
            },
            ".turn-black": {
                'display': 'flex',
                'justifyContent': 'center',
                'alignItems': 'center',
                'borderRadius': '100%',
                'backgroundColor': '#000',
                'width': cellSizeString,
                'height': cellSizeString,
            } as React.CSSProperties,
        }
    }
}