import React, { Component, Fragment } from 'react';
import Icon from '@material-ui/core/Icon';
import Utils from '../../Utils';


class FightHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            side: this.props.side,
            show: false
        }
    }

    handleMouseOverRow(e) {
        document.body.style.cursor = "pointer";
        let parent;
        if (e.target.parentNode.nodeName === "TD") {
            parent = e.target.parentNode.parentNode;
        }
        else
            parent = e.target.parentNode;

        parent.classList.add('HighlightRow');
    }

    handleMouseOutRow(e) {
        document.body.style.cursor = "default";
        e.target.parentNode.classList.remove('HighlightRow');

    }

    handleShowMoreStats(e) {
        let parent;
        if (e.target.parentNode.nodeName === "TD") {
            parent = e.target.parentNode.parentNode;
        }
        else
            parent = e.target.parentNode;

        if (parent.nextSibling !== null) {
            if (parent.nextSibling.classList.contains("HideInfo")) {
                parent.nextSibling.classList.add("ShowInfo");
                parent.nextSibling.nextSibling.classList.add("ShowInfo");
                parent.nextSibling.classList.remove("HideInfo");
                parent.nextSibling.nextSibling.classList.remove("HideInfo");
            }
            else {
                parent.nextSibling.classList.add("HideInfo");
                parent.nextSibling.nextSibling.classList.add("HideInfo");
                parent.nextSibling.classList.remove("ShowInfo");
                parent.nextSibling.nextSibling.classList.remove("ShowInfo");
            }
        }
    }

    formatDate(dt) {
        return new Date(dt).toLocaleDateString();
    }

    render() {
        let fighterExists = Utils.fighterExists(this.props.fighter);
        let jsxFights = null;
        let side = this.props.side;
        let ClassHeader;
        let ClassHeaderFighterName;
        let ClassHideSide = '';

        if (side === 'left') {
            ClassHeader = "LeftHeaderRow";
            ClassHeaderFighterName = "LeftHeaderRowFightHistory";
            if (!fighterExists) {
                ClassHideSide = "LeftSideHidden";
            }

            if (!this.props.show) {
                ClassHideSide = "LeftSideHidden";
            }
        }
        else if (side === 'right') {
            ClassHeader = "RightHeaderRow";
            if (!fighterExists) {
                ClassHideSide = "RightSideHidden";
            }
            if (!this.props.show) {
                ClassHideSide = "RightSideHidden";
            }
        }

        if (fighterExists === true) {
            let winLoseFont;
            let winLoseIcon;
            let rowClass = '';

            jsxFights = this.props.fighter.summary_fights.map((x, idx) => {

                if (idx % 2 === 0)
                    rowClass = 'RowEven';
                else
                    rowClass = 'RowOdd';

                if (x.result === 'win') {
                    winLoseFont = 'WinFont';
                    winLoseIcon = (<Icon>thumb_up</Icon>)
                }
                else {
                    winLoseFont = 'LoseFont';
                    winLoseIcon = (<Icon>thumb_down</Icon>)
                }

                return (
                    <Fragment key={this.props.fighter.id + 'r' + idx}>
                        <tr key={this.props.fighter.id + idx} className={`FightHistoryRow ${rowClass} ValueFont`} onClick={this.handleShowMoreStats} onMouseOver={this.handleMouseOverRow} onMouseOut={this.handleMouseOutRow}>
                            <td className={winLoseFont}>{winLoseIcon}</td>
                            <td className="FontOpponent">{`${x.opponent}`}</td>
                            <td colSpan='3'>{x.name}<br /><span className='FontSubtle'>{this.formatDate(x.date)}</span></td>
                        </tr>
                        <tr className="FightHistoryRow HeaderRowSub HideInfo">
                            <td rowSpan={2}></td>
                            <td>Method</td>
                            <td>Referee</td>
                            <td>R</td>
                            <td>Time</td>
                        </tr>
                        <tr className="FightHistoryRow HideInfo ValueFont">

                            <td>{x.method}</td>
                            <td>{x.referee}</td>
                            <td>{x.round}</td>
                            <td>{x.time}</td>
                        </tr>

                        <tr className={`FightHistoryRow ${rowClass} dataExpand ValueFont`}>

                        </tr>
                    </Fragment>
                )
            });
        };


        return (

            <table className={`ProfFightHistory ${ClassHideSide}`}>
                <tbody>
                    <tr>
                        <td colSpan={5} className={`${ClassHeader}  `}>
                            <div className={`StatFighterNameBar ${ClassHeaderFighterName}`}>

                                <div>Fight History </div>
                                <div>{`${this.props.fighter.first_name} ${this.props.fighter.last_name}`}</div>
                            </div>
                        </td>
                    </tr>
                    <tr className={`FightHistoryRow HeaderRow HeaderLabelFont ${ClassHeader}`}>
                        <td>Win/Lose</td>
                        <td>Opponent</td>
                        <td colSpan='3'>Event</td>
                    </tr>

                    {jsxFights}
                </tbody>
            </table >
        );
    }
}

export default FightHistory;
