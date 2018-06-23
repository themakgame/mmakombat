import React, { Component } from 'react';
import { FighterOutput } from './Fighter/FighterComps';


export default class Profile extends Component {

    render() {

        let classSide;
        if (this.props.facing === "left") {
            classSide = 'TextAlignRight';
        }
        else {
            classSide = 'TextAlignLeft';
        }

        return (
            <div className={"profile " + classSide} >
                <FighterOutput facing={this.props.facing} fighter={this.props.fighter} />
            </div>
        )
    }
}



