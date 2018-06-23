import React, { Component } from 'react';
import { connect } from "react-redux";
import Profile from './Profile';
import { FighterStats } from './Fighter/FighterComps';
import Button from '@material-ui/core/Button';
import SearchBar from './SearchBar';
import Utils from '../Utils';
import FightHistory from './Fighter/FightHistory';

import MKSong from '../components/Sounds/MKSong';

require('dotenv').config();

function mapStateToProps(state) {
    return {
        mainFighter: state.mainFighter,
        secondFighter: state.secondFighter

    };
}

class AppClass extends Component {
    constructor() {
        super();
        this.state = { openSearch: false, drawerDirection: 'right' };

        this.handleOpenSearch = this.handleOpenSearch.bind(this);
        this.handleSearchClose = this.handleSearchClose.bind(this);

        this.myStyles = {
            style1: {
                color: "red",
                "font-size": "3em"
            }
        }

    }

    toggleFighters(e) {
        document.getElementsByClassName("right")[0].classList.toggle("rightMove")
    }

    ToggleStats() {
        [...document.getElementsByClassName("BottomProfile")].forEach((el) => {
            if (el.classList.contains('show'))
                el.classList.remove('show');
            else
                el.classList.add('show');
        })
    }

    handleOpenSearch(drawerDirection) {

        this.setState({ openSearch: !this.state.openSearch, "drawerDirection": drawerDirection })

    }

    toggleClass() {
        [...document.getElementsByClassName("BottomProfile")].forEach((el) => {
            if (el.classList.contains('FadeIn'))
                el.classList.remove('FadeIn');
            else
                el.classList.add('FadeIn');
        })
    }

    handleSearchClose() {
        this.setState({ openSearch: false })
    }

    componentDidMount() {
        setTimeout(() => {
            this.refs.LogoFontMMA.classList.add("Opacity1");

        }, 200);
        setTimeout(() => {
            this.refs.LogoFontKombat.classList.add("Opacity1");

        }, 600);
    }

    render() {
        let isSafari = false;

        if (Utils.GetBrowser() === "safari") {
            isSafari = true;
        }

        return (

            <div className="wrapper">

                <div className="ring"></div>

                <div id='container'>

                    <SearchBar open={this.state.openSearch} drawerDirection={this.state.drawerDirection} SearchClose={this.handleSearchClose} />

                    <header >

                        <div className="PunchButtonLeft">
                            <Button variant="fab" style={{ color: "blue" }} aria-label="edit" onClick={() => { this.handleOpenSearch("right") }}>
                                <img className='FlipImage' src="../images/glove_sb.png" width="35px" alt="" />
                            </Button>
                        </div>
                        <div className="LogoName" ref="LogoName">
                            <div className="FighterNameLeft LogoFont" ref="LogoFontMMA">mma</div>
                            <div className=" FighterNameRight LogoFont" ref="LogoFontKombat">Kombat</div>
                            {!isSafari &&
                                <MKSong />
                            }
                        </div>
                        <div className="PunchButtonRight">
                            <Button variant="fab" style={{ color: "blue" }} aria-label="edit" onClick={() => { this.handleOpenSearch("left") }}>
                                <img className="FlipImage" src="../images/glove_sr.png" width="35px" alt="" />
                            </Button>
                        </div>
                    </header>
                    <main className='body'>
                        <div className='cage'></div>
                        <section className='profTop'>
                            <Profile facing="right" fighter={this.props.mainFighter} />
                            <div></div>
                            <Profile facing="left" fighter={this.props.secondFighter} />
                        </section>

                        <section className='profStat'>
                            <div className="StatMiddleContent">
                                <FighterStats mainFighter={this.props.mainFighter} secondFighter={this.props.secondFighter} />
                            </div>
                            <div className="StatMiddleBottom">
                                <FightHistory fighter={this.props.mainFighter} side='left' show={!this.state.openSearch} />
                                <FightHistory fighter={this.props.secondFighter} side='right' show={!this.state.openSearch} />
                            </div>

                        </section>

                    </main>
                </div>
            </div >




        )
    }

}

const App = connect(mapStateToProps, null)(AppClass);

export default App;