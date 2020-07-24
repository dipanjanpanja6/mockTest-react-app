import React, { Component } from "react";
import { Grid, Button, Dialog, DialogActions, TextField, DialogContent, DialogTitle, DialogContentText, SnackbarContent,LinearProgress, Snackbar } from "@material-ui/core";

import { addExam, examList,classData, setLogin, checkLogin } from "../redux/action/adminActions";
import { connect } from "react-redux";
import PropType from "prop-types";
import ExamListItem from "../component/examListComponent";
import { url } from "../config"


class examsList extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      
      examName: "",
      examDate: "",
      examMarks: 15,
      batch: "",
      examKey: "",
      durations: 30,
      
      success: null,
      error: false,
      message: "",

      classData: [],
      examData: null,
      
      adminId: localStorage.getItem('admin')
    };
  }
  componentDidMount() {
    console.log("examlist mount");

    // const adminId = localStorage.admin;
    this.props.examList();
    this.props.checkLogin(this.props.history);
    this.props.setLogin();
    console.log(this.state.adminId);
    this.props.classData();
  }


  componentWillReceiveProps(nextProps) {

    if (nextProps.admin.examData) {
      this.setState({ examData: nextProps.admin.examData });
    }
    if (nextProps.admin.classData) {
      
      this.setState({ classData:[ ...nextProps.admin.classData] });
      console.log(this.state.classData);
    }
    if (nextProps.admin.addExamSuccess) {
      this.setState({
        success: nextProps.admin.addExamSuccess,
        open: false,
        error: false,
        examName: "",
        examDate: "",
        examMarks: 15,
        batch: "",
        examKey: "",
        durations: 30,
        
      });

      // this.props.examList();
    }
    if (nextProps.admin.addExamError) {
      this.setState({ error: true, message: nextProps.admin.addExamError });
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

    const data = {
      testName: this.state.examName,
      time: this.state.examDate,
      total_marks: this.state.examMarks,
      class: this.state.batch,
      examKey: this.state.examKey,
      durations: this.state.durations,
      adminId: this.state.adminId
    };
    this.props.addExam(data);
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  statusChange = (a, b) => {
    fetch(`${url}/admin/exam/${b}/${!a}`, {
      method: "POST",
    }).then(res => {
      res.json().then(d => {
        console.log(d);
        this.props.examList();
      })
    })
  }
  addClass=(e,f)=>{
    
    console.log(e,f);
    const data={
      class:e.class,adminId:this.state.adminId,examId:f
    }
    fetch(`${url}/admin/class/addClassToExam`,{
      method:"PUT",
      headers:{"Content-Type":"Application/json"},
      body:JSON.stringify(data)
    }).then(res=>{res.json().then(d=>{
      console.log(d);
    this.props.examList();
      
    })}).catch(r=>console.log(r))
    
  }
  deleteClass=(e,ex)=>{
    console.log(e,ex);
    const data={
      class:e,adminId:this.state.adminId,examId:ex
    }
    fetch(`${url}/admin/class/deleteClassToExam`,{
      method:"PUT",
      headers:{"Content-Type":"Application/json"},
      body:JSON.stringify(data)
    }).then(res=>{res.json().then(d=>{
      console.log(d);
    this.props.examList();
      
    })}).catch(r=>console.log(r))
  }
  render() {
    const { message, error, examData,classData } = this.state;



    let exams = examData ? examData.length == 0 ?
      <SnackbarContent style={{margin:"12px"}}
        message={
          'No content! Please list your exams here.'
        }

      /> :
      examData.map(exam => (
        <ExamListItem key={exam.exam_id} exam={exam} status={this.statusChange} clas={classData} deleteClass={this.deleteClass} addClass={this.addClass} />
      )) : <LinearProgress color="secondary" />

    return (
      <div>
        <Grid>
          {exams}
        </Grid>
        <Button style={{ bottom: "20px", right: "20px", position: "fixed" }}
          variant="contained"
          size="large"
          color="secondary" onClick={this.handleClickOpen}
        >
          Add Exam
        </Button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle >Add Exam</DialogTitle>
          <DialogContent>
            {!error &&
              <DialogContentText>
                To add Exam, please enter your Exam name here.
            </DialogContentText>}
            {error &&
              <DialogContentText color="error">
                {message}
              </DialogContentText>}
            <TextField
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

              name="batch"
              value={this.state.batch}
              onChange={this.handleChange}
              // select
              style={{ paddingRight: "20px", width: "150px" }}
              margin="dense"
              label="Select Batch"
            />
            <TextField

              name="examKey"
              value={this.state.examKey}
              onChange={this.handleChange}

              style={{ paddingRight: "20px", width: "150px" }}
              margin="dense"
              label="Set access Key"
            />
            <TextField

              name="durations"
              value={this.state.durations}
              onChange={this.handleChange}

              style={{ paddingRight: "20px", width: "150px" }}
              margin="dense"
              label="Durations in min"
            />
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
  examList: PropType.func.isRequired,
  setLogin: PropType.func.isRequired,
  checkLogin: PropType.func.isRequired,
  classData: PropType.func.isRequired,
};
const mapState = state => ({ admin: state.admin });
const mapActionToProps = {
  addExam,classData,
  examList, setLogin, checkLogin
};

export default connect(mapState, mapActionToProps)(examsList);
