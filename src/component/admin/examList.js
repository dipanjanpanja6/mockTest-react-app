import React, { Component } from "react";
import {
  Grid,
  Button, Fab,
  Dialog,
  DialogActions,
  TextField,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Paper
} from "@material-ui/core";
import { addExam, examList } from "../../redux/action/adminActions";
import { connect } from "react-redux";
import PropType from "prop-types";
import ExamListItem from "../admin/examListItem";

class examsList extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      examName: "",
      examDate: "",
      examMarks: 15,
      batch: "",
      success: null,
      error: {},
      examData: null
    };
  }
  componentWillMount() {
    this.props.examList();
  }
  componentWillReceiveProps(nextProps, context) {
    console.log(nextProps)
    if (nextProps.admin.examData) {
      this.setState({ examData: nextProps.admin.examData });
    }
    if (nextProps.admin.addExamSuccess) {
      this.setState({ success: nextProps.admin.addExamSuccess });
      this.setState({ open: !this.state.open });
    }
    if (nextProps.admin.addExamError) {
      this.setState({ error: nextProps.admin.addExamError });
    }
  }
  handleClickOpen = () => {
    this.setState({
      open: !this.state.open
    });
  };
  handleClose = () => {
    this.setState({
      open: !this.state.open
    });
  };
  addExam = () => {
    const examName = this.state.examName;
    const examMarks = this.state.examMarks;
    const examDate = this.state.examDate;
    const batch = this.state.batch;

    const data = {
      testName: examName,
      time: examDate,
      total_marks: examMarks,
      class: batch
    };
    this.props.addExam(data);
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { error, examData } = this.state;
    console.log({ examData });
    let exams = examData
      ? examData.map(exam => (
        <ExamListItem key={Math.floor(Math.random() * 20)} exam={exam} />
      ))
      : "";

    return (
      <div>
        <Grid style={{}}>
          {exams}
        </Grid>
        <Button
          style={{ bottom: "20px", right: "20px", position: "fixed", boxShadow: "2px 2px 7px 2px #000" }}
          variant="contained"

          size="large"
          color="secondary"
          onClick={this.handleClickOpen}
        >
          Add Exam
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Exam</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add Exam, please enter your Exam name here.
            </DialogContentText>
            <TextField
              helperText={error.title ? error.title : ""}
              error={error.title ? true : false}
              autoFocus
              name="examName"
              value={this.state.examName}
              onChange={this.handleChange}
              margin="dense"
              label="Exam Name"
              fullWidth
            />
            <TextField
              helperText={error.time && error.time}
              error={error.time ? true : false}
              name="examDate"
              value={this.state.examDate}
              onChange={this.handleChange}
              style={{ paddingRight: "20px" }}
              margin="dense"
              InputLabelProps={{
                shrink: true
              }}
              label="Exam Date"
              type="datetime-local"
            ></TextField>
            <TextField
              helperText={error.marks && error.marks}
              error={error.marks ? true : false}
              name="examMarks"
              value={this.state.examMarks}
              onChange={this.handleChange}
              style={{ paddingRight: "20px", width: "100px" }}
              margin="dense"
              label="Exam Mark's"
              type="number"
            ></TextField>
            <TextField
              helperText={error.class && error.class}
              error={error.class ? true : false}
              name="batch"
              value={this.state.batch}
              onChange={this.handleChange}
              // select
              style={{ paddingRight: "20px", width: "150px" }}
              margin="dense"
              label="Class"
            ></TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addExam} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
examList.PropType = {
  addExam: PropType.func.isRequired,
  admin: PropType.object.isRequired,
  examList: PropType.func.isRequired
};
const mapState = state => ({ admin: state.admin });
const mapActionToProps = {
  addExam,
  examList
};

export default connect(mapState, mapActionToProps)(examsList);
