import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import React, {Component} from 'react';

import PlayableChessboard from '../components/Chessboard/PlayableChessboard';

class Home extends Component {

  state = {
    size: 0,
  };

  constructor(props: any) {
    super(props);

    this.state = {
      size: this.computeBoardSize(),
    }
    window.screen.orientation.addEventListener('change', this.updateBoardSize);
  }

  componentWillUnmount() {
    window.screen.orientation.removeEventListener('change', this.updateBoardSize);
  }

  render() {
    const size = this.state.size;

    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Ionic Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-no-padding">
          <PlayableChessboard 
            size={size} 
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            reversed={false}
          ></PlayableChessboard>
        </IonContent>
      </>
    );
  }

  private updateBoardSize = () => {
    const size = this.computeBoardSize();
    this.setState({ size });
  }

  private computeBoardSize = () => {
    const baseSize =  window.innerWidth < window.innerHeight ?
    window.innerWidth : window.innerHeight;

    return window.screen.orientation.type === ('portrait-primary' || 'portrait-secondary') ?
      baseSize : baseSize - 84;
  }
  
};

export default Home;