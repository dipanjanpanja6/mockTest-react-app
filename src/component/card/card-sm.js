import withStyle from "@material-ui/core/styles/withStyles";
// import '../card/card.css'
import AddIcon from "@material-ui/icons/Add";
import {
  List,
  Checkbox,
  IconButton,
  ListItemIcon,
  ListItem,
  ListItemText,
  Card,
  CardHeader,
  Grid,
  CardContent,
  CardActions,
  ListItemSecondaryAction,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Dialog,
  TextField,
} from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from "@material-ui/icons/Edit";
import SupervisedUserCircleRoundedIcon from "@material-ui/icons/SupervisedUserCircleRounded";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import React, { Component } from "react";
import {studentList} from '../../redux/action/adminActions'
import PropType from "prop-types";
import { connect } from "react-redux";
import CloseIcon from '@material-ui/icons/Close';


const style = theme => ({
  card: {
    margin: "20px"
  },
  expand: {
    marginLeft: "auto"
  },
  icon: {
    // marginRight:"0px"
  },
  text:{
    margin:theme.spacing(1)
  },
  textArea: {
    display:'flex',
    flexDirection:'column',
    margin:'auto',
  },
  list:{
        
       

  }

});

class cardSm extends Component {
  constructor() {
    super();

    this.state = {
      setChecked: null,
      setCheckedAll: null,
      openDialog: false,
      userLoginID:"",
      userName:"",
      studentData:null,
      enableEdit:false,
      editValue:"",
      

    };
  }
  componentDidMount() {
    const id = this.props.classData.class;
    console.log(id);
    this.setState({
      editValue:id
    })
    
    this.props.studentList(id);
    this.getClassData(id)
   
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.admin.studentData){
    //  this.setState({studentData:nextProps.admin.studentData});
      
    }
  }
  getClassData = (id) =>{
    fetch(`http://localhost:7000/admin/student/list/${id}`,{
      method:'GET',
      headers: {
          'Content-Type': 'application/json',
      }
  })
  .then((response)=>{
      response.json()
      .then((data)=>{
           console.log({data, id});
          if(data.success){
              this.setState({
                studentData:data.data
              })
          }
      })
  })
  .catch((error)=>{
      console.log(error);
  })
  }
  handleDialogClose = () => {
    this.setState({ openDialog: false });
  };
  handelChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleClose = () => {
    this.setState({ open: false });
    this.setState({ success: false });
  };
  handleToggleAll = event => {
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
    if ({ [event.target.name]: event.target.checked }) {
      this.setState({ setChecked: event.target.checked });
    }
    console.log(this.state.setCheckedAll);
  };
  handleToggle = event => {
    this.setState({  [event.target.name]: event.target.checked });
    console.log(this.state.setChecked);
  };
  editStudent=()=>{
    this.setState({ openDialog: true });
  }
  addStudent = () => {
    this.setState({ openDialog: true });
  };
  handleAddStudent = () => {
    const {classData}=this.props;
    const classID=classData.class;
    const userName=this.state.userName;
    const userLoginID=this.state.userLoginID;
    const data ={
      userName:userName,
      userClass:classID,
      userLoginID:userLoginID
    }
    console.log(data);
    
    fetch(`http://localhost:7000/admin/student/add`,{
      method:'POST',
        body:JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then((response)=>{
        response.json()
        .then((d)=>{
            console.log(d);
            this.getClassData(this.props.classData.class)
            
        })
    })
    .catch((error)=>{
        console.log(error)
    })
  };
  onDeleteClass=()=>{

  }
  onEditClass=()=>{
    this.setState({
      enableEdit:!this.state.enableEdit
    })
    const j=!this.state.enableEdit
    if(j===false){
      const id = this.props.classData.class;
    this.setState({
      editValue:id
    })
    }
  }
  onHandelChange=(event)=>{
    this.setState({ [event.target.name]: event.target.value });
  }
  saveUpDate=(event)=>{
    const data = {
      class:this.state.editValue
    };
    if(event.keyCode==13){
      fetch(`http://localhost:7000/admin/student/class/edit/${this.props.classData.class}`,{
        method:'POST',
        body:JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
      })
      .then((res)=>{res.json().then((data)=>{
        console.log(data);
        
      })})
    }
  }
  
  render() {
    const { classes,classData } = this.props;
    // console.log(classData);
    const studentData = this.state.studentData;
    
    const Lista =(props)=>{
      const {student}=props;
    return(
      <List dense className='list' >
              <ListItem button >
                <ListItemIcon >
                  <AccountCircleTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  primary={student.userId}
                  secondary={student.userName}
                />
                <ListItemSecondaryAction className='listIcon'>
                  <IconButton onClick={this.editStudent}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton onClick={this.editStudent}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  <Checkbox
                    name="setChecked"
                    size="small"
                    onChange={this.handleToggle}
                    checked={this.state.setChecked}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
    )}
    let students=studentData
    ? studentData.map(stu => (
      <Lista key={stu.id} student={stu}/>
    ))
    : "";
    return (
      <Grid item xs={12} sm={6} md={4}>
      
        <Card className={classes.card}>
          <CardHeader
            avatar={<SupervisedUserCircleRoundedIcon fontSize="large" />}
            action={
              <div>
                {this.state.enableEdit == true &&
                 <IconButton onClick={this.onEditClass} className={classes.icon}>
                 <CloseIcon />
               </IconButton>}
              {this.state.enableEdit == false &&
                 <IconButton onClick={this.onEditClass} className={classes.icon}>
                 <EditIcon />
               </IconButton>}
               
                <IconButton onClick={this.onDeleteClass} className={classes.icon}>
                  <  DeleteForeverIcon/>
                </IconButton>

                <Checkbox
                  name="setCheckedAll"
                  onChange={this.handleToggleAll}
                  checked={this.state.setCheckedAll}
                />
              </div>
            }
            title={
              // classData.class
              <div>
              {this.state.enableEdit == true &&
                <TextField
                onKeyDown={this.saveUpDate} 
                name="editValue"
                value={this.state.editValue}
                onChange={this.onHandelChange}
                />}
              {this.state.enableEdit == false &&
                classData.class}
              </div>
            }
            
            subheader={classData.createdAt}
          />
          <CardContent style={{ maxHeight: "400px",
      overflow: "auto" ,padding: "1px 16px 1px" }}>
            {students}


          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              className={classes.expand}
              onClick={this.addStudent}
              aria-label="show more"
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </CardActions>
        </Card>
        <div>
          <Dialog
            fullScreen={false}
            open={this.state.openDialog}
            onClose={this.handleDialogClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle>{"Add your student's here..."}</DialogTitle>

            <DialogContent>
            <div className={classes.textArea}>
              <TextField
              variant='outlined'
                className={classes.text}
                onChange={this.handelChange}
                autoFocus
                label="Name"
                name="userName"
              />
              <TextField
                variant='outlined'
                className={classes.text}
                onChange={this.handelChange}
                label="Username"
                name="userLoginID"
              />
              </div>
           
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={this.handleDialogClose}
                color="primary"
              >
                Close
              </Button>
              <Button onClick={this.handleAddStudent} color="primary" autoFocus>
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Grid>
    );
  }
}
cardSm.PropType = {
  studentList:PropType.func.isRequired,
};
const mapState = state => ({ admin: state.admin });
const mapActionToProps = {
  
  studentList,
  
};
export default connect(mapState, mapActionToProps)(withStyle(style)(cardSm));
