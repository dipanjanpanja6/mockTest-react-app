
import React, { Component } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Autocomplete from '@material-ui/lab/Autocomplete'
import { withStyles } from "@material-ui/core/styles";
import { Grid, Chip, TextField, Fab } from "@material-ui/core";
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';

var dateFormat = require("dateformat");

const useStyles = theme => ({
  root: {
    // width: "100%",
    margin: theme.spacing(1)
  },
  expension: {

    justifyContent: "space-between",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "50%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  button: { margin: theme.spacing(1) },
  chip: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5)
    }
  }
});

class examListItem extends Component {
  constructor() {
    super();
    this.state = {
      value: null
    }
  }
  onEdit = () => {
    const { exam } = this.props;
    window.location = `/admin/${exam.exam_id}/questions`
    // window.open = ("/admin/${exam.exam_id}/questions","k")
  }
  onView = () => {
    // window.location = `/admin/student`
    window.open = ("","k")
  }
  onStatus = () => {
    const { exam } = this.props;
    const status = (exam.status == "true")
    this.props.status(status, exam.exam_id)



    // const status=exam

    // this.setState({active:!this.state.active})
  }
  handleDelete = (p) => {
    const { exam } = this.props;
    this.props.deleteClass(p, exam.exam_id)
  };

  handleChange = panel => (event, isExpanded) => { };
  render() {
    const { classes, exam, clas } = this.props;
    // console.log(clas);

    const status = (exam.status == "true")


    return (
      <div className={classes.root}>
        <ExpansionPanel onChange={this.handleChange("panel1")}>
          <ExpansionPanelSummary classes={{ content: classes.expension }}
            expandIcon={<ExpandMoreIcon />}

          >
            <Typography className={classes.heading}>
              {exam.testName}</Typography>
            <div className={classes.chip}>
              {JSON.parse(exam.class).map(p => {

                return <Chip color="secondary" label={p} onDelete={() => this.handleDelete(p)} />
              })}

            </div>
            {/* <Typography className={classes.secondaryHeading}>
              {exam.class}</Typography> */}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container >
              <Grid item md>
                <Typography>Created At : {dateFormat(exam.createdAt, 'ddd, dS mmmm yyyy  h:MM TT')}</Typography>
                <Typography>Total Marks : {exam.total_marks}</Typography>
                <Typography>Durations : {exam.durations} min</Typography>
                <Typography>Exam starting time {dateFormat(exam.time, 'ddd, dS mmmm yyyy  h:MM TT')}</Typography>
                <Typography>Exam key : {exam.examKey}</Typography>
              </Grid>
              <Grid >
                <Autocomplete
                  options={clas}
                  style={{ marginBottom: "10px" }}
                  value={this.state.value}
                  onKeyDown={e => {
                    if (e.keyCode === 13) {
                      if (this.state.value !== null) { this.props.addClass(this.state.value, exam.exam_id) }
                    }
                  }}
                  onChange={(event, newValue) => {
                    this.setState({ value: newValue });
                  }}
                  getOptionLabel={(option) => option.class}
                  renderInput={(params) => <TextField {...params} label="Add batch" size='small' variant="outlined" />}
                />

                <Fab onClick={this.onEdit} className={classes.button} variant="extended" color="primary" size="medium" >
                  <FormatListNumberedIcon />
                  Questions
                </Fab>
                {!status &&
                  <Fab onClick={this.onStatus} className={classes.button} variant="extended" color="primary" size="medium">
                    <PlayCircleFilledIcon />
                    Active
                </Fab>}
                {status &&
                  <Fab onClick={this.onStatus} className={classes.button} variant="extended" size="medium">
                    <PauseCircleFilledIcon />
                    Disable
                </Fab>}
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(useStyles)(examListItem);
