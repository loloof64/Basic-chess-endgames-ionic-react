import { IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/react';
import React, {Component} from 'react';

import Chessboard from 'chessboardjsx';

interface ScreenDimensions {
  screenWidth: number;
  screenHeight: number;
};

class Home extends Component {
  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Ionic Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-no-padding">
          <Chessboard 
            position="start" 
            calcWidth={this.calculateSize}
            boardStyle={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          ></Chessboard>
        </IonContent>
      </>
    );
  }

  private calculateSize(newDimensions: ScreenDimensions) {
    return newDimensions.screenWidth < newDimensions.screenHeight ?
      newDimensions.screenWidth : newDimensions.screenHeight - 60;
  }
  
};

export default Home;