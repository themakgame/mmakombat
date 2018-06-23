import React, { Component } from 'react';
import Utils from '../../Utils';

class FighterStatsBottom extends Component {

    render() {
        let stats = null;
        stats = (
            <div className='fighterProfileBottom' >
                <div className='StatRow'>
                    <div>Rank</div>
                </div>
            </div>
        )

        return (
            <div className='TopChart'>
                {stats}
            </div>

        )
    }
}

class FighterStats extends Component {
    componentDidUpdate() {
        let existMainFighter = Utils.fighterExists(this.props.mainFighter);
        let existSecondFighter = Utils.fighterExists(this.props.secondFighter);

        if (existMainFighter || existSecondFighter) {
            setTimeout(() => {
                this.refs.fighterProfileTop.classList.add("Opacity1");
            }, 200);
        }
    }
    render() {

        let stats = null;
        let existMainFighter = Utils.fighterExists(this.props.mainFighter);
        let existSecondFighter = Utils.fighterExists(this.props.secondFighter);

        stats = (
            <div className='fighterProfileTop' ref='fighterProfileTop'>
                <div className='StatRow'>
                    {existMainFighter &&
                        <div>{Utils.jsxInfo(this.props.mainFighter, 'rank', Utils.getRank)}</div>
                    }
                    <div className="LabelFont">Rank</div>
                    {existSecondFighter &&
                        <div>{Utils.jsxInfo(this.props.secondFighter, 'rank', Utils.getRank)}</div>
                    }
                </div>
                <div className='StatRow'>
                    {existMainFighter &&
                        <div>{Utils.jsxInfo(this.props.mainFighter, 'wins')}-{Utils.jsxInfo(this.props.mainFighter, 'losses')}-{Utils.jsxInfo(this.props.mainFighter, 'draws')}</div>
                    }
                    <div className="LabelFont">Record</div>
                    {existSecondFighter &&
                        <div>{Utils.jsxInfo(this.props.secondFighter, 'wins')}-{Utils.jsxInfo(this.props.secondFighter, 'losses')}-{Utils.jsxInfo(this.props.secondFighter, 'draws')}</div>
                    }
                </div>
                <div className='StatRow'>
                    {existMainFighter &&
                        <div>{Utils.jsxInfo(this.props.mainFighter, 'weight_class', Utils.getWeightClass)}</div>
                    }
                    <div className="LabelFont">Weight Class</div>
                    {existSecondFighter &&
                        <div>{Utils.jsxInfo(this.props.secondFighter, 'weight_class', Utils.getWeightClass)}</div>
                    }
                </div>

                <div className='StatRow'>
                    {existMainFighter &&
                        <div>{Utils.jsxInfo(this.props.mainFighter, 'nationality')}</div>
                    }
                    <div className="LabelFont">Nationality</div>
                    {existSecondFighter &&
                        <div>{Utils.jsxInfo(this.props.secondFighter, 'nationality')}</div>
                    }
                </div>
                <div className='StatRow'>
                    {existMainFighter &&
                        <div>{Utils.jsxInfo(this.props.mainFighter, 'birthday', Utils.calcBday)}</div>
                    }
                    <div className="LabelFont">Age</div>
                    {existSecondFighter &&
                        <div>{Utils.jsxInfo(this.props.secondFighter, 'birthday', Utils.calcBday)}</div>
                    }
                </div>
                <div className='StatRow'>
                    {existMainFighter &&
                        <div>{Utils.jsxInfo(this.props.mainFighter, 'height')}</div>
                    }
                    <div className="LabelFont">Height</div>
                    {existSecondFighter &&
                        <div>{Utils.jsxInfo(this.props.secondFighter, 'height')}</div>
                    }
                </div>
                <div className='StatRow FontSmall'>
                    {existMainFighter &&
                        <div>{Utils.jsxInfo(this.props.mainFighter, 'association')}</div>
                    }
                    <div className="LabelFont">Association</div>
                    {existSecondFighter &&
                        <div>{Utils.jsxInfo(this.props.secondFighter, 'association')}</div>
                    }
                </div>
            </div>
        )




        return (
            <div className="TopChart">
                {stats}
            </div>

        )

    }
}

class FighterOutput extends Component {
    constructor(props) {
        super(props);
        this.state = { last_name: null, imgFighter: null };
    }

    componentDidUpdate(nextProps) {
        if (nextProps.fighter !== this.props.fighter) {
            let trans = '';
            if (this.props.facing === 'right') {
                trans = 'profileImgSlideInLeft';
            }
            else {
                trans = 'profileImgSlideInRight';
            }
            this.refs["profileImg" + this.props.facing].classList.remove("profileImgTransition");
            this.refs["profileImg" + this.props.facing].classList.add(trans);

            setTimeout(() => {
                this.refs["profileImg" + this.props.facing].classList.add("profileImgTransition");
                this.refs["profileImg" + this.props.facing].classList.remove(trans);
            }, 100)
        }
    }

    render() {
        let imgFighter = this.state.imgFighter;
        let fighter = this.props.fighter;
        let classProfSide = '';
        if (this.props.facing === "left") {
            classProfSide = 'FighterNameRight';
        }
        else {
            classProfSide = 'FighterNameLeft';
        }

        if (fighter !== undefined) {
            if ("last_name" in fighter) {
                if (fighter.left_full_body_image !== undefined) {
                    if (this.props.facing === "left")
                        imgFighter = (<img ref={`profileImg${this.props.facing}`} className='profileImg' src={process.env.REACT_APP_SERVERIP + "/images" + fighter.right_full_body_image} alt="" />)
                    else
                        imgFighter = (<img ref={`profileImg${this.props.facing}`} className='profileImg' src={process.env.REACT_APP_SERVERIP + "/images" + fighter.left_full_body_image} alt="" />)
                }
                else        // no full body pic, defaul to profile pic
                {
                    if (this.props.facing === "left") {
                        imgFighter = (<img className='profileImg profileImgTransition' ref={`profileImg${this.props.facing}`} src={process.env.REACT_APP_SERVERIP + "/images/bodyshots/right_generic.png"} alt="" />)
                    }
                    else {
                        imgFighter = (<img className=' profileImg profileImgTransition' ref={`profileImg${this.props.facing}`} src={process.env.REACT_APP_SERVERIP + "/images/bodyshots/left_generic.png"} alt="" />)
                    }
                }
            }
            else {
                if (this.props.facing === "left")
                    imgFighter = (<img className='profileImg profileImgTransition' ref={`profileImg${this.props.facing}`} src={process.env.REACT_APP_SERVERIP + "/images/bodyshots/right_generic.png"} alt="" />)
                else
                    imgFighter = (<img className=' profileImg profileImgTransition' ref={`profileImg${this.props.facing}`} src={process.env.REACT_APP_SERVERIP + "/images/bodyshots/left_generic.png"} alt="" />)
            }

        }

        let nickname = Utils.jsxInfo(fighter, 'nickname');
        if (nickname !== "") {
            nickname = `"${nickname}"`;
        }
        else {
            nickname = <div>&nbsp;</div>;
        }

        return (
            <div>
                <div className="ImageProfile" >
                    <div className={`FighterName ${classProfSide} `}>
                        {Utils.jsxInfo(fighter, 'full_name')}
                        <br />
                        {nickname}
                    </div>
                </div>

                {imgFighter}
            </div>
        );
    }
}


export { FighterOutput, FighterStats, FighterStatsBottom };