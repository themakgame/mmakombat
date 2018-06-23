import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 170,
    },
    menu: {
        width: 170,
    },
});

class WeightSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weightClass: this.props.setWeight
        }

        this.weightClasses = [
            { value: '', label: '' },
            { value: 'Flyweight', label: 'Flyweight' },
            { value: 'Bantamweight', label: 'Bantamweight' },
            { value: 'Featherweight', label: 'Featherweight' },
            { value: 'Lightweight', label: 'Lightweight' },
            { value: 'Welterweight', label: 'Welterweight' },
            { value: 'Middleweight', label: 'Middleweight' },
            { value: 'Light_Heavyweight', label: 'Light Heavyweight' },
            { value: 'Real_Heavyweight', label: 'Heavyweight' },
            { value: 'Strawweight', label: 'Strawweight' }
        ];

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            weightClass: e.target.value,
        });

        this.props.searchWeight(e.target.value);
    };

    render() {
        const { classes } = this.props;

        return (

            <TextField
                id="selectWeight"
                select
                label="Weight Class"
                className={classes.textField}
                value={this.state.weightClass}
                onChange={this.handleChange}
                SelectProps={{
                    MenuProps: {
                        className: classes.menu,
                    },
                }}
                // helperText="Weight Class"
                margin="normal"
            >
                {this.weightClasses.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

        )

    }
}

WeightSelection.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WeightSelection);

const stylesSex = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 150,
    },
    menu: {
        width: 150,
    },
});

class SexClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sex: this.props.setSex
        }

        this.weightClasses = [
            { value: '', label: '' },
            { value: 'Flyweight', label: 'Flyweight' },
            { value: 'Bantamweight', label: 'Bantamweight' },
            { value: 'Featherweight', label: 'Featherweight' },
            { value: 'Lightweight', label: 'Lightweight' },
            { value: 'Welterweight', label: 'Welterweight' },
            { value: 'Middleweight', label: 'Middleweight' },
            { value: 'Light_Heavyweight', label: 'Light Heavyweight' },
            { value: 'Real_Heavyweight', label: 'Heavyweight' },
            { value: 'Strawweight', label: 'Strawweight' }
        ];

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            sex: e.target.value,
        });

        this.props.searchSex(e.target.value);
    };



    render() {
        const { classes } = this.props;

        return (

            <TextField
                id="selectSex"
                select
                label="Sex"
                className={classes.textField}
                value={this.state.sex}
                onChange={this.handleChange}
                SelectProps={{
                    MenuProps: {
                        className: classes.menu,
                    },
                }}
                margin="normal"
            >
                <MenuItem key="" value="" ></MenuItem>
                <MenuItem key="m" value="m">Male</MenuItem>
                <MenuItem key="f" value='f'>Female</MenuItem>
            </TextField>

        )

    }
}

SexClass.propTypes = {
    classes: PropTypes.object.isRequired,
};

const Sex = withStyles(stylesSex)(SexClass);

export { Sex };
