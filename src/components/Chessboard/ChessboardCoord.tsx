import React, { Component } from 'react';

export default class ChessboardCoord extends Component<{key_value: string, value: string, cellSize: number}> {
    value = '';
    cellSize = 0.0;

    shouldComponentUpdate(nextProps: any) {
        const valueChanged = this.props.value !== nextProps.value;
        const cellSizeChanged = this.props.cellSize !== nextProps.cellSize;

        return valueChanged || cellSizeChanged;
    }

    render() {
        return (<div key={this.props.key_value} style={this.styles()['.coord']}>{this.props.value}</div>)
    }

    private styles = () => {

        const fontSize = Math.ceil(this.props.cellSize * 0.2);

        return {
            ".coord": {
                'display': 'flex',
                'justifyContent': 'center',
                'alignItems': 'center',
                'backgroundColor': '#120D48',
                'color': '#DADF48',
                'fontWeight': 'bold',
                'fontSize': `${fontSize}px`, 
            } as React.CSSProperties,
        }
    }
}