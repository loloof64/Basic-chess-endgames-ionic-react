import React, { Component } from 'react';

export default class ChessboardCell extends Component<{key_value: string, 
    whiteCell: boolean, size: number,
    isDndStartCell: boolean, isDndEndCell: boolean
}> {

    shouldComponentUpdate(nextProps: any) {
        const whiteCellChanged = this.props.whiteCell !== nextProps.whiteCell;
        const sizeChanged = this.props.size !== nextProps.size;
        const isDndStartCellChanged = this.props.isDndStartCell !== nextProps.isDndStartCell;
        const isDndEndCellChanged = this.props.isDndEndCell !== nextProps.isDndEndCell;

        return whiteCellChanged || sizeChanged || isDndStartCellChanged || isDndEndCellChanged;
    }

    render() {
        let colorClass = '.white-cell';
        if (this.props.whiteCell === false) colorClass = '.black-cell';
        if (this.props.isDndStartCell) colorClass = '.drag-start-cell';
        if (this.props.isDndEndCell) colorClass = '.drag-end-cell';
        return (<div key={this.props.key_value} style={(this.styles() as any)[colorClass]}></div>);
    }

    private styles = () => {
        return {
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
            ".white-cell": {
                'backgroundColor': '#CA9326',
            } as React.CSSProperties,
            ".black-cell": {
                'backgroundColor': '#482D0D',
            } as React.CSSProperties
        }
    }

}
