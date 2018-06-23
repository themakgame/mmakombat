import React, { Fragment } from "react";



const AudioTest = props => {

    const play = () => {

        // let audio = new Audio("../sounds/snd_CloseDoor.ogg");
        // audio.play();

        // let audio = document.getElementById("audio");
        // audio.play();
    };

    return (
        <Fragment>
            <input type="button" value="PLAY" onClick={play} />
            {/* <audio id="audio" src="../../sounds/snd_CloseDoor.ogg" ></audio> */}
        </Fragment>
    )
}

export default AudioTest;