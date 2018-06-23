import React, { ReactDOM } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { connect } from 'react-redux';
import { setMainFighter, setSecondFighter } from "../actions/indexAction";
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import WeightSelection from './CompsSelection';
import { Sex } from './CompsSelection';

const mapDispatchToProps = dispatch => {
    return {
        setMainFighter: fighter => dispatch(setMainFighter(fighter)),
        setSecondFighter: fighter => dispatch(setSecondFighter(fighter))
    };
};

const styles = {
    list: {
        width: "100vw",
        height: "50vh",
        display: 'block',
    }
};

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fighters: [],
            drawerOpen: this.props.open,
            drawerDirection: this.props.drawerDirection,
            weightClass: '',
            sex: '',
            searchName: '',
            show: true
        };

        this.searched = false;
        this.mainFighter = true;        // defaults to left side (main fighter)
        this.enableSelection = true;
        this.handleSearch = this.handleSearch.bind(this);
        this.handlePickFighter = this.handlePickFighter.bind(this);
        this.handleMouseOverFighter = this.handleMouseOverFighter.bind(this);
        this.handleWeightSearch = this.handleWeightSearch.bind(this);
        this.handleSexSearch = this.handleSexSearch.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
    }

    componentWillUpdate(newProps, newState) {
        if (newState.drawerOpen === true)
            this.enableSelection = true;
        else
            this.enableSelection = false;

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open !== this.props.open) {
            this.setState({ drawerOpen: nextProps.open, drawerDirection: nextProps.drawerDirection });
        }
    }

    componentDidUpdate() {
        this.fadeIn();

    }

    // componentDidMount() {
    //     FOR TESTING ONLY
    //     this.setFighter(242524);
    //     setTimeout(function () { this.mainFighter = false; }.bind(this), 200);
    //     setTimeout(function () { this.setFighter(290162); }.bind(this), 300);

    // }

    toggleDrawer = (open = false) => {

        if (!open) {
            this.props.SearchClose();
        }

        this.setState({
            drawerOpen: open,
        });

    };


    handlePickFighter(e) {
        this.setFighter(e.target.dataset.id);
        this.toggleDrawer(false);
    }

    handleChangeText() {
        let searchVal = document.getElementById("searchBox").value;
        this.setState({ searchName: searchVal })
        this.handleSearch();
    }


    fadeIn() {
        // css transition effect for fading in search results
        if (this.refs.SearchResults !== undefined) {
            if (this.refs.SearchResults.classList.contains("showSearchResults")) {
                this.refs.SearchResults.classList.remove("showSearchResults");
            }
            setTimeout(() => {
                if (this.refs.SearchResults !== undefined) {
                    this.refs.SearchResults.classList.add("showSearchResults");
                }
            }, 200);
        }
    }

    handleSearch() {
        this.setState({ show: false });
        let searchVal = document.getElementById("searchBox").value;
        this.setState({ searchName: searchVal })
        const url = process.env.REACT_APP_SERVERIP + "/fighters/search/?name=" + searchVal + "&weight=" + this.state.weightClass + '&sex=' + this.state.sex;

        fetch(url)
            .then(resp => resp.json())
            .then((data) => {
                this.setState({
                    fighters: data,
                    show: true
                })
            })

    }

    setFighter(id) {
        const url = process.env.REACT_APP_SERVERIP + "/fighters/get/?id=" + id;

        fetch(url)
            .then(resp => resp.json())
            .then((data) => {
                if (this.mainFighter === true)
                    this.props.setMainFighter(data);
                else
                    this.props.setSecondFighter(data);
            })
    }

    handleMouseOverFighter(e) {
        if (this.state.drawerDirection === "left")
            this.mainFighter = false;
        else
            this.mainFighter = true;

        if (this.enableSelection) {
            if (e.target.dataset.id !== undefined)
                this.setFighter(e.target.dataset.id, true);
        }
    }

    enableSelection() {
        this.enableSelection = true;
    }

    handleWeightSearch(weightClass) {
        this.setState({ weightClass: weightClass }, () => {
            this.handleSearch();
        });
    }

    handleSexSearch(sex) {
        this.setState({ sex: sex }, () => {
            this.handleSearch();
        });
    }

    render() {
        const { classes } = this.props;

        let OutFighters = this.state.fighters.map(x => {
            let thumbnailImg = '';
            if (x.thumbnail === undefined) {
                thumbnailImg = process.env.REACT_APP_SERVERIP + "/images/headshots/generic.jpg";
            }
            else {
                thumbnailImg = process.env.REACT_APP_SERVERIP + "/images" + x.thumbnail;
            }

            return (
                <div className='searchItem' key={x.id} data-id={x.id} onClick={this.handlePickFighter} onMouseOver={this.handleMouseOverFighter}>
                    <img data-id={x.id} alt={x.last_name} src={thumbnailImg} />
                    <div className='searchItemName'>{`${x.first_name} ${x.last_name}`}</div>
                </div>
            )
        });

        let btnClearClass;

        if (this.state.drawerDirection === "left")
            btnClearClass = "btnClearLeft";
        else
            btnClearClass = "btnClearRight";


        const jsxSearchBody = (
            <div className={classes.list}>

                <div className='SearchPanel'>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="searchBox">Search Name</InputLabel>
                        <Input ref="searchBox" id="searchBox" onChange={this.handleChangeText} autoFocus={true} value={this.state.searchName} />
                    </FormControl>
                    <br />
                    <WeightSelection searchWeight={this.handleWeightSearch} setWeight={this.state.weightClass} />
                    <Sex searchSex={this.handleSexSearch} setSex={this.state.sex} />


                    <div className={`SearchResultsWrap`} ref="SearchResultsWrap">

                        <div className={`SearchResults showSearchResults`} ref="SearchResults">
                            {OutFighters}
                        </div>
                    </div>

                </div >

            </div >
        );

        return (
            <div className="drawer">
                <Drawer
                    ModalProps={{ BackdropProps: { "style": { "backgroundColor": "rgba(0, 0, 0, .2)" } } }}
                    variant="temporary"
                    anchor={this.state.drawerDirection}
                    open={this.state.drawerOpen}
                    onClose={() => { this.toggleDrawer(false) }}
                >
                    <div className="swipeDrawer">
                        <div className={btnClearClass}>
                            <IconButton variant="fab" onClick={() => { this.toggleDrawer(false) }} ><Icon>clear</Icon></IconButton>
                        </div>
                        {jsxSearchBody}
                    </div>
                </Drawer>
            </div >
        );
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
};

const SearchBar = connect(null, mapDispatchToProps)(Search);

export default withStyles(styles)(SearchBar);
