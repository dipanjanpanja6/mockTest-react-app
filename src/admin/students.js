import React, { Component } from "react";
import {Grid,} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { setLogin, checkLogin } from "../redux/action/adminActions";
import PropType from "prop-types";
import { connect } from "react-redux";
import CardSm from "../component/card/card-sm";
import {studentList} from '../redux/action/adminActions'

const style = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
});

class Student extends Component {
  constructor(){
    super();
    this.state={
      studentData:null
    }
  }
  componentWillMount() {
    this.props.checkLogin(this.props.history);
    this.props.setLogin();
    this.props.studentList();
  }
  componentWillReceiveProps(nextProps, context){
    // console.log(nextProps);
    if(nextProps.admin.studentData){
      this.setState({studentData:nextProps.admin.studentData});
    }
  }
  render() {
    const { classes } = this.props;
    const {studentData}=this.state;
    let student = studentData
      ? studentData.map(stu => (
        <CardSm key={stu.id} student={stu} />
      ))
      : "";
    return (
        <Grid container xs={12}>
        {student}
       </Grid>
    );
  }
}
Student.PropType = {
  setLogin: PropType.func.isRequired,
  checkLogin: PropType.func.isRequired,
  studentList:PropType.func.isRequired
};
const mapState = state => ({ admin: state.admin });
const mapActionToProps = {
  setLogin,
  checkLogin,
  studentList
};
export default connect(mapState, mapActionToProps)(withStyles(style)(Student));
