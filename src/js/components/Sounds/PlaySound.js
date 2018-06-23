import React, { Component } from 'react';
import Music from './Music';
import Sound from 'react-sound';

class PlaySound extends Component {
    constructor(props) {
        super(props);
        this.state = { status: Sound.status.STOPPED };
        this.playSound = this.playSound.bind(this);
    }

    playSound() {
        this.setState({ status: Sound.status.PLAYING });
    }

    render() {

        return (
            <div>
                <Music url="../sounds/snd_CloseDoor.ogg" playStatus={this.state.status} />
                <button id='btnPlaySound' onClick={this.playSound} >Play</button>
            </div>
        )
    }

}

export default PlaySound;