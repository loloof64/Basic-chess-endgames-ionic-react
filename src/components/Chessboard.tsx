import React, { Component } from "react";

export default class ChessBoard extends Component {

    props: any;

    render() {
        const size = this.props.size || 200;

        return (
            <div style={this.styles()[".board-root"]}>
                {[0,1,2,3,4,5,6,7,8,9].map((row: number, rowIndex: number) => {
                    return [0,1,2,3,4,5,6,7,8,9].map((col: number, colIndex: number) => {
                        return (
                            <div style={this.styles()[".empty-zone"]}></div>
                        );
                    });
                })}
            </div>
        )
    }

    private styles = () => {
        const size = this.props.size || 200;
        const sizeString = `${size}px`;

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
                'color': '#DADF48',
                'font-weight': 'bold',
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