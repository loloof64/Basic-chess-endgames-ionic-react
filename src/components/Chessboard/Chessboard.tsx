import React, { Component, CSSProperties, createRef } from "react";

interface DragInformations {
    col: number,
    row: number,
}

export default class Chessboard extends Component {

    props: any;
    clickLayer = createRef<HTMLDivElement>();

    state = {
        dragStart: undefined as DragInformations,
    };

    render() {
        const position = this.props.position || "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
        const pieces = this.getPiecesFromPosition(position);
        const whiteToPlay = position.split(" ")[1] === 'w';
        const reversed = this.props.reversed || false;

        return (
            <div style={{...this.props.style, ...this.styles()[".board-root"]}}>
                {[0,1,2,3,4,5,6,7,8,9].map((row: number, rowIndex: number) => {
                    return [0,1,2,3,4,5,6,7,8,9].map((col: number, colIndex: number) => {
                        return this.generateCell(row, col, pieces, whiteToPlay, reversed);
                    });
                })}
                <div 
                    style={this.styles()[".board-interactive-layer"]}
                    onMouseDown={this.handleDragStart}
                    onMouseUp={this.handleDragEnd}
                    ref={this.clickLayer}
                ></div>
            </div>
        )
    }

    private generateCell = (row: number, col: number, pieces: string[][],
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
                return this.generateRegularCell(key, row, col, pieces, reversed);
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
        pieces: string[][], reversed: boolean) => {
        const isWhiteCell = (row + col) % 2 === 0;
        let style = isWhiteCell ? this.styles()['.white-cell'] : this.styles()['.black-cell'];
        const dragStart = this.state.dragStart;
        if (dragStart !== undefined && dragStart.col === col && dragStart.row === row){
            style = this.styles()['.drag-start-cell']
        }
        const value = pieces[reversed ? (8-row) : (row-1)][reversed ? (8-col) : (col-1)];
        const piecePath = this.getPiecePath(value);

        let pieceElement;
        if (piecePath === undefined) {
            pieceElement = undefined;
        }
        else {
            const size = (this.props.size || 200) / 9.0
            const sizeString = `${size}px`;

            pieceElement = (
                <img
                    src={piecePath} 
                    width={sizeString} 
                    height={sizeString} 
                    alt="piece"
                >
                </img>
            )
        }

        return (<div key={key} style={style}>{pieceElement}</div>)
    }

    private generatePlayerTurn(key: string, whiteToPlay: boolean) {
        return (
            <div key={key} style={this.styles()['.empty-zone']}>
                <div style={this.styles()[whiteToPlay ? '.turn-white' : '.turn-black']}></div>
            </div>
        )
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
        const cellSize = (this.props.size / 9.0);
        const halfCellSize = cellSize / 2.0;
        const clickLayer = this.clickLayer.current!;
        if (clickLayer) {
            const clickLayerBoundingRect = clickLayer.getBoundingClientRect();
            const clickLayerX = clickLayerBoundingRect.left;
            const clickLayerY = clickLayerBoundingRect.top;
            const col = Math.floor((event.clientX - clickLayerX - halfCellSize) / cellSize) + 1;
            const row = Math.floor((event.clientY - clickLayerY - halfCellSize) / cellSize) + 1;

            this.setState({
                dragStart: {
                    col, row
                }
            })
        }
    }

    private handleDragEnd = (event: any) => {
        this.setState({
            dragStart: undefined,
        })
    }

    private styles = () => {
        const size = this.props.size || 200;
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