import React, { Component } from "react";

export default class ChessBoard extends Component {

    props: any;

    render() {
        const size = this.props.size || 200;

        return (
            <div style={this.styles()[".board-root"]}>
                {[0,1,2,3,4,5,6,7,8,9].map((row: number, rowIndex: number) => {
                    return [0,1,2,3,4,5,6,7,8,9].map((col: number, colIndex: number) => {
                        return this.generateCell(row, col);
                    });
                })}
            </div>
        )
    }

    private generateCell = (row: number, col: number) => {
        if (row === 0 || row === 9) {
            if (col >= 1 && col <= 8) {
                return this.generateFileCoordinate(col);
            }
        }
        else {
            if (col === 0 || col === 9) {
                return this.generateRankCoordinate(row);
            }
        }
        return (
            <div style={this.styles()[".empty-zone"]}></div>
        );
    }

    private generateFileCoordinate = (col: number) => {
        const valueString = String.fromCharCode('A'.charCodeAt(0) + col - 1);
        return (<div style={this.styles()[".coord"]}>{valueString}</div>);
    }

    private generateRankCoordinate = (row: number) => {
        const valueString = String.fromCharCode('1'.charCodeAt(0) + 8 - row);
        return (<div style={this.styles()[".coord"]}>{valueString}</div>);
    }

    private styles = () => {
        const size = this.props.size || 200;
        const sizeString = `${size}px`;
        const fontSize = Math.ceil(size * 0.05);

        return {
            ".board-root": {
                'display': 'grid',
                'gridTemplate': '1fr repeat(8, 2fr) 1fr / 1fr repeat(8, 2fr) 1fr',
                'width': sizeString,
                'height': sizeString,
            },
            ".empty-zone": {
                'display': 'flex',
                'justify-content': 'center',
                'align-items': 'center',
                'background-color': '#414CDA',
            },
            ".coord": {
                'display': 'flex',
                'justify-content': 'center',
                'align-items': 'center',
                'background-color': '#414CDA',
                'color': '#DADF48',
                'font-weight': 'bold',
                'font-size': `${fontSize}px`, 
            },
            ".turn-white": {
                'display': 'flex',
                'justify-content': 'center',
                'align-items': 'center',
                'border-radius': '100%',
                'background-color': '#FFF',
            },
            ".turn-black": {
                'display': 'flex',
                'justify-content': 'center',
                'align-items': 'center',
                'border-radius': '100%',
                'background-color': '#000',
            }
        };
    }
}