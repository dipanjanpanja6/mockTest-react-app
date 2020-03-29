import React, { Component } from "react";
import {Grid,} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { setLogin, checkLogin } from "../redux/action/adminActions";
import PropType from "prop-types";
import { connect } from "react-redux";
import CardSm from "../component/card/card-sm";
import {classData} from '../redux/action/adminActions'



class Student extends Component {
  constructor(){
    super();
    this.state={
      studentData:null,
      classData:null
    }
  }
  componentDidMount() {
    this.props.checkLogin(this.props.history);
    this.props.setLogin();
    // this.props.studentList();
    this.props.classData();
  }
  componentWillReceiveProps(nextProps, context){
    // console.log(nextProps);
    
    if(nextProps.admin.classData){
      this.setState({classData:nextProps.admin.classData})
      
    }
  }
  render() {
    const { classData}=this.state;
    let student = classData
      ? classData.map(stu => (
        <CardSm key={stu.id} classData={stu}/>
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
  // studentList:PropType.func.isRequired,
  classData:PropType.func.isRequired,

};
const mapState = state => ({ admin: state.admin });
const mapActionToProps = {
  setLogin,
  checkLogin,
  // studentList,
  classData
};
export default connect(mapState, mapActionToProps)(Student);
