import React, { Component } from 'react';

export default class ChessboardPlayerTurn extends Component<{whiteToPlay: boolean, cellSize: number}> {
    whiteToPlay = true;
    cellSize: number;

    shouldComponentUpdate(nextProps: any) {
        const whiteToPlayChanged = this.props.whiteToPlay === nextProps.whiteToPlay;
        const cellSizeChanged = this.props.cellSize !== nextProps.cellSize;

        return whiteToPlayChanged || cellSizeChanged;
    }

    render() {
        const turnClass = this.props.whiteToPlay === true ? '.turn-white' : '.turn-black';
        return (<div style={this.styles()['.empty-zone']}>
            <div style={this.styles()[turnClass]}></div>
        </div>)
    }

    private styles = () => {
        const size = this.props.cellSize * 0.5;
        const sizeString = `${size}px`;
        return {
            ".empty-zone": {
                'backgroundColor': '#120D48',
            } as React.CSSProperties,
            ".turn-white": {
                'display': 'flex',
                'justifyContent': 'center',
                'alignItems': 'center',
                'borderRadius': '100%',
                'backgroundColor': '#FFF',
                'width': sizeString,
                'height': sizeString,
            },
            ".turn-black": {
                'display': 'flex',
                'justifyContent': 'center',
                'alignItems': 'center',
                'borderRadius': '100%',
                'backgroundColor': '#000',
                'width': sizeString,
                'height': sizeString,
            } as React.CSSProperties,
        }
    }

}