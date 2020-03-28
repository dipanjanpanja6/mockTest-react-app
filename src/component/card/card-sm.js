import withStyle from "@material-ui/core/styles/withStyles";
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
import EditIcon from "@material-ui/icons/Edit";
import SupervisedUserCircleRoundedIcon from "@material-ui/icons/SupervisedUserCircleRounded";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import React, { Component } from "react";
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
    margin:'auto'
  },

});

class cardSm extends Component {
  constructor() {
    super();
    this.state = {
      setChecked: null,
      setCheckedAll: null,
      openDialog: false
    };
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
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
    console.log(this.state.setChecked);
  };
  editStudent=()=>{
    this.setState({ openDialog: true });
  }
  
  addStudent = () => {
    this.setState({ openDialog: true });
  };
  handleAddStudent = () => {};

  render() {
    const { classes,student } = this.props;
    
    return (
      <Grid item xs={12} sm={6} md={4}>
      
        <Card className={classes.card}>
          <CardHeader
            avatar={<SupervisedUserCircleRoundedIcon fontSize="large" />}
            action={
              <div>
                <IconButton className={classes.icon}>
                  <EditIcon />
                </IconButton>

                <Checkbox
                  name="setCheckedAll"
                  onChange={this.handleToggleAll}
                  checked={this.state.setCheckedAll}
                />
              </div>
            }
            title={student.class}
            subheader={student.createdAt}
          />
          <CardContent style={{ padding: "1px 16px 1px" }}>
            <List dense style={{ maxHeight: "400px", overflow: "auto" }}>
              <ListItem button >
                <ListItemIcon >
                  <AccountCircleTwoToneIcon />
                </ListItemIcon>
                <ListItemText
                  primary={student.login_id}
                  secondary={student.userName}
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={this.editStudent}>
                    <EditIcon fontSize="small" />
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
            fullScreen={true}
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
              />
              <TextField
                variant='outlined'
                className={classes.text}
                onChange={this.handelChange}
                label="Username"
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

export default withStyle(style)(cardSm);
