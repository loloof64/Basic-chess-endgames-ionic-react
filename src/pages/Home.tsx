import { IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/react';
import React, {Component} from 'react';

import Chessboard from '../components/Chessboard/Chessboard';

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
          <Chessboard size={400} reversed={true} style={{
            position: 'absolute',
            top: '50%', left: '32%',
            transform: 'translate(-32%, -50%)'
          }}
          position="rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2
"></Chessboard>
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