import React, { Component } from 'react';

export default class ChessboardCell extends Component<{key_value: string, whiteCell: boolean, size: number}> {
    whiteCell: boolean;
    size = 0.0;

    shouldComponentUpdate(nextProps: any) {
        const whiteCellChanged = this.props.whiteCell !== nextProps.whiteCell;
        const sizeChanged = this.props.size !== nextProps.size;

        return whiteCellChanged || sizeChanged;
    }

    render() {
        const colorClass = this.props.whiteCell === true ? '.white-cell' : '.black-cell';
        return (<div key={this.props.key_value} style={this.styles()[colorClass]}></div>);
    }

    private styles = () => {
        return {
            ".white-cell": {
                'backgroundColor': '#CA9326',
            } as React.CSSProperties,
            ".black-cell": {
                'backgroundColor': '#482D0D',
            }
        }
    }

}
