import React, { Component } from "react";

export default class ChessBoard extends Component {

    props: any;

    render() {
        const position = this.props.position || "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
        const pieces = this.getPiecesFromPosition(position);
        const whiteToPlay = position.split(" ")[1] === 'w';

        return (
            <div style={this.styles()[".board-root"]}>
                {[0,1,2,3,4,5,6,7,8,9].map((row: number, rowIndex: number) => {
                    return [0,1,2,3,4,5,6,7,8,9].map((col: number, colIndex: number) => {
                        return this.generateCell(row, col, pieces, whiteToPlay);
                    });
                })}
            </div>
        )
    }

    private generateCell = (row: number, col: number, pieces: string[][], whiteToPlay: boolean) => {
        const key = `${row}${col}`;
        if (row === 0 || row === 9) {
            if (col >= 1 && col <= 8) {
                return this.generateFileCoordinate(key, col);
            }
            else if (row === 9 && col === 9) {
                return this.generatePlayerTurn(key, whiteToPlay);
            }
        }
        else {
            if (col === 0 || col === 9) {
                return this.generateRankCoordinate(key, row);
            }
            else {
                return this.generateRegularCell(key, row, col, pieces);
            }
        }
        return (
            <div key={key} style={this.styles()[".empty-zone"]}></div>
        );
    }

    private generateFileCoordinate = (key: string, col: number) => {
        const valueString = String.fromCharCode('A'.charCodeAt(0) + col - 1);
        return (<div key={key} style={this.styles()[".coord"]}>{valueString}</div>);
    }

    private generateRankCoordinate = (key: string, row: number) => {
        const valueString = String.fromCharCode('1'.charCodeAt(0) + 8 - row);
        return (<div key={key} style={this.styles()[".coord"]}>{valueString}</div>);
    }

    private generateRegularCell = (key: string, row: number, col: number, pieces: string[][]) => {
        const isWhiteCell = (row + col) % 2 === 0;
        const style = isWhiteCell ? this.styles()['.white-cell'] : this.styles()['.black-cell'];
        const value = pieces[row-1][col-1];
        const pieceElement = this.getPieceElement(value);
        return (<div key={key} style={style}>{pieceElement}</div>)
    }

    private generatePlayerTurn(key: string, whiteToPlay: boolean) {
        return (
            <div key={key} style={this.styles()['.empty-zone']}>
                <div style={this.styles()[whiteToPlay ? '.turn-white' : '.turn-black']}></div>
            </div>
        )
    }

    private getPieceElement = (value: any) => {
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
        const url = `/assets/vectors/Chess_${typeString}t45.svg`;
        const size = (this.props.size || 200) / 9.0
        const sizeString = `${size}px`;
        return (<img src={url} width={sizeString} height={sizeString} alt="piece"></img>)
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
            },
            ".empty-zone": {
                'backgroundColor': '#120D48',
            },
            ".white-cell": {
                'display': 'flex',
                'justifyContent': 'center',
                'alignItems': 'center',
                'backgroundColor': '#CA9326',
            },
            ".black-cell": {
                'display': 'flex',
                'justifyContent': 'center',
                'alignItems': 'center',
                'backgroundColor': '#482D0D',
            },
            ".coord": {
                'display': 'flex',
                'justifyContent': 'center',
                'alignItems': 'center',
                'backgroundColor': '#120D48',
                'color': '#DADF48',
                'fontWeight': 800,
                'fontSize': `${fontSize}px`, 
            },
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
            }
        };
    }
}