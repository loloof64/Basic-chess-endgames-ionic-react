import React, { Component } from 'react';

export default class ChessboardEmptyCell extends Component {

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (<div style={this.styles()['.empty-zone']}></div>);
    }

    private styles = () => {
        return {
            ".empty-zone": {
                'backgroundColor': '#120D48',
            } as React.CSSProperties,
        }
    }

}
