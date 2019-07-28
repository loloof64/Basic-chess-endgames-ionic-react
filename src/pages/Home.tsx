import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import React, {Component} from 'react';

import Chessboard from '../components/Chessboard/Chessboard';

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

    console.log('size is', size);

    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Ionic Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-no-padding">
          <Chessboard size={size} style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          position="rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2
" reversed={true}></Chessboard>
        </IonContent>
      </>
    );
  }

  private updateBoardSize = () => {
    console.log('updating board size');

    const size = this.computeBoardSize();
    this.setState({ size });
  }

  private computeBoardSize = () => {
    console.log('dimensions', window.innerWidth, window.innerHeight);
    console.log(window.screen.orientation.type);
    
    const baseSize =  window.innerWidth < window.innerHeight ?
    window.innerWidth : window.innerHeight;

    return window.screen.orientation.type === ('portrait-primary' || 'portrait-secondary') ?
      baseSize : baseSize - 84;
  }
  
};

export default Home;