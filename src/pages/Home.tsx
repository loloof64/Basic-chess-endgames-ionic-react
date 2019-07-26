import { IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/react';
import React, {Component} from 'react';

import Chessboard from '../components/Chessboard';

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
          <Chessboard></Chessboard>
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