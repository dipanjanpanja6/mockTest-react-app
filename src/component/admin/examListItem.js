import React, { Component } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { withStyles } from "@material-ui/core/styles";
import { Divider, Grid, Button } from "@material-ui/core";

const useStyles = theme => ({
  root: {
    // width: "100%",
    margin: theme.spacing(1)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  button:{ margin: theme.spacing(1)}
});

class examListItem extends Component {
  onEdit=()=>{
    const { exam } = this.props;
    window.location=`/admin/examEdit/${exam.exam_id}`
  }
  onView=()=>{

  }
  onDelete=()=>{

  }

  handleChange = panel => (event, isExpanded) => {};
  render() {
    const { classes } = this.props;
    const { exam } = this.props;
    return (
      <div className={classes.root}>
        <ExpansionPanel onChange={this.handleChange("panel1")}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>{exam.testName}</Typography>
            <Typography className={classes.secondaryHeading}>
              {exam.class}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Grid container >
              <Grid sm>
                <Typography>Created At : {exam.createdAt}</Typography>
                <Divider
                  style={{ marginLeft: "20px", marginRight: "20px" }}
                  orientation="vertical"
                  flexItem
                />
                <Typography>Total Marks = {exam.total_marks}</Typography>
                <Divider
                  style={{ marginLeft: "20px", marginRight: "20px" }}
                  orientation="vertical"
                  flexItem
                />
                <Typography>Exam starting time {exam.time}</Typography>
              </Grid>
              <Grid >
                <Button onClick={this.onEdit} variant="contained" color="primary">
                  Edit
                </Button>
                <Button onClick={this.onView} className={classes.button} variant="contained" color="primary">
                  View
                </Button>
                <Button onClick={this.onDelete} className={classes.button} variant="contained" color="secondary">
                  Delete
                </Button>
              </Grid>
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

export default withStyles(useStyles)(examListItem);
