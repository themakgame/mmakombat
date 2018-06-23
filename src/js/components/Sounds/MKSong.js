import React, { Fragment, Component } from 'react';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

class MKSong extends Component {
    constructor(props) {
        super(props);
        this.state = { on: false };
        this.audioSrc = null;

        this.handleAudioToggle = this.handleAudioToggle.bind(this);
    }

    componentDidMount() {
        this.audioSrc = this.refs["songAudio"];

    }

    getAllMethods(object) {
        return Object.getOwnPropertyNames(object).filter(function (property) {
            return typeof object[property] === 'function';
        });
    }




    handleAudioToggle() {
        try {
            if (this.audioSrc.paused === true) {
                this.audioSrc.muted = false;
                this.setState({ on: true })
                this.audioSrc.play();
            }
            else {
                this.audioSrc.pause();
                this.setState({ on: false })
            }
        }
        catch (ex) {
            console.log('err: ' + ex)
        }
    }

    render() {
        let jsxIcon = null;

        if (this.state.on) {

            jsxIcon = (
                <IconButton aria-label="Music">
                    < Icon onClick={this.handleAudioToggle} className="Controls" >music_notes</Icon>
                </IconButton>
            )
        } else if (!this.state.on) {
            jsxIcon = (
                <IconButton aria-label="Music">
                    < Icon onClick={this.handleAudioToggle} className="Controls" >music_off</Icon>
                </IconButton>
            )
        }


        return (
            <Fragment>
                {jsxIcon}
                <audio
                    ref='songAudio'
                    id='songAudio'
                    src="../sounds/mk.ogg"
                    muted={true}
                    loop={true}
                    autoPlay={false}
                />
            </Fragment >

        );
    }
}

export default MKSong;
