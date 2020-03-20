import React, { Component } from 'react'
import { Grid, Typography, Button, Divider } from '@material-ui/core'
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import PropType from 'prop-types'
import { connect } from 'react-redux'
import withStyles from "@material-ui/core/styles/withStyles";
import AddQuestion from './addQues'


import { checkAdmin, setLogin } from '../../redux/action/adminActions'

const useStyles = theme => ({
    root: {
        //   width: "100%",
        margin: theme.spacing(1)
    },
    list: {
        width: "100%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: "75%",
        flexShrink: 0
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: "33.33%",
        color: theme.palette.text.secondary
    },
    marks: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary
    },
    button: { margin: theme.spacing(1) }
});

class examEdit extends Component {
    componentWillMount() {

        const id = this.props.match.params.examID
        console.log(id)
    }
    handleChange = panel => (event, isExpanded) => { };
    render() {
        const id = this.props.match.params.examID
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container>

                    <div className={classes.list}>
                        <ExpansionPanel onChange={this.handleChange("panel1")}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography className={classes.heading}>What is dynamic array?</Typography>

                                <Typography className={classes.secondaryHeading}>A variable size data structure</Typography>
                                <Typography className={classes.marks}>1</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid container xs={10} >
                                    <Grid container item xs={10}>
                                        <Grid item xs={5}> a) hi</Grid>
                                        <Grid item xs={5}> b) hello</Grid>
                                    </Grid>
                                    <Grid container item xs={10}>
                                        <Grid item xs={5}> c) A variable size data structure</Grid>
                                        <Grid item xs={5}> d) hello</Grid>
                                    </Grid>
                                </Grid>
                                <Button onClick={this.onDelete} className={classes.button} variant="contained" color="primary">Edit</Button>
                                <Button onClick={this.onDelete} className={classes.button} variant="contained" color="secondary">Delete</Button>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>

                    <AddQuestion id={id} />
                </Grid>
            </div>

        )
    }
}
examEdit.propType = {

    checkAdmin: PropType.func.isRequired,
    classes: PropType.object.isRequired,
    setLogin: PropType.func.isRequired
}
const mapState = (state) => ({

})
const mapActionToProps = {
    checkAdmin,
    setLogin
}

export default connect(mapState, mapActionToProps)(withStyles(useStyles)(examEdit))
