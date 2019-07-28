import React, { Component } from 'react';
import { IonModal, IonGrid, IonRow, IonCol, IonButton, IonImg } from '@ionic/react';

export default class PromotionDialogModal extends Component<{whitePlayer: boolean, isOpen: boolean, 
    callback: (pieceType: string) => void, dismissCallback: () => void}> {

    render() {
        const message = 'Please select the promotion piece:';

        return (
            <IonModal isOpen={this.props.isOpen} 
            onDidDismiss={this.props.dismissCallback}>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            { message }
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol>
                            <IonButton color="light"
                                onClick={() => this.props.callback('q')}
                            >
                                <IonImg src={
                                    this.props.whitePlayer ?
                                    '/assets/vectors/Chess_qlt45.svg' :
                                    '/assets/vectors/Chess_qdt45.svg' 
                                 }></IonImg>
                            </IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton color="light"
                                onClick={() => this.props.callback('r')}
                            >
                                <IonImg src={
                                    this.props.whitePlayer ?
                                    '/assets/vectors/Chess_rlt45.svg' :
                                    '/assets/vectors/Chess_rdt45.svg' 
                                 }></IonImg>
                            </IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton color="light"
                                onClick={() => this.props.callback('b')}
                            >
                                <IonImg src={
                                    this.props.whitePlayer ?
                                    '/assets/vectors/Chess_blt45.svg' :
                                    '/assets/vectors/Chess_bdt45.svg' 
                                 }></IonImg>
                            </IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton color="light"
                                onClick={() => this.props.callback('n')}
                            >
                                <IonImg src={
                                    this.props.whitePlayer ?
                                    '/assets/vectors/Chess_nlt45.svg' :
                                    '/assets/vectors/Chess_ndt45.svg' 
                                 }></IonImg>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonModal>
        );
        
    }
}