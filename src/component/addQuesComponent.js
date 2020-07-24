import React, { Component } from "react";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  Button,
  Dialog,
  Snackbar,
  Radio,
  AppBar,
  Fab,
  TextField
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MuiAlert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { quesList, deleteSuccess } from "../redux/action/adminActions";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import withStyles from "@material-ui/core/styles/withStyles";
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = theme => ({
  editor:{
    minHeight:"20vh",
    border:"1px solid #F1F1F1",
    marginBottom:"12px"
}
});
// const theme = useTheme();
class addQues extends Component {
  constructor() {
    super();
    this.state = {
      ques: "",
      op1: "",
      op2: "",
      op3: "",
      op4: "",
      marks: "",
      ans: "",
      selected: null,
      error: {},
      open: false,
      success: false,
      openDialog: false
    };
  }
 
  //  [open, setOpen] = React.useState(false);

  //  fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  handleClickOpen = () => {
    this.setState({ openDialog: true });
  };

  handleDialogClose = () => {
    this.setState({ openDialog: false });
  };
  componentDidMount() {
    const { id } = this.props;
    console.log(id);
  }
  handelChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleAddQues = () => {
    const ques = this.state.ques;
    const op1 = this.state.op1;
    const op2 = this.state.op2;
    const op3 = this.state.op3;
    const op4 = this.state.op4;
    const marks = this.state.marks;
    const selected = this.state.selected;
    const { id } = this.props;

    let ans = "";
    if (selected === "a") {
      ans = op1;
    } else if (selected === "b") {
      ans = op2;
    } else if (selected === "c") {
      ans = op3;
    } else if (selected === "d") {
      ans = op4;
    }
    if (ques == "") {
      this.setState({
        error: { questions: "must not be empty" }
      });
    } else if (op1 == "") {
      this.setState({
        error: { option_1: "must not be empty" }
      });
    } else if (op2 == "") {
      this.setState({
        error: { option_2: "must not be empty" }
      });
    } else if (op3 == "") {
      this.setState({
        error: { option_3: "must not be empty" }
      });
    } else if (op4 == "") {
      this.setState({
        error: { option_4: "must not be empty" }
      });
    } else if (marks == "") {
      this.setState({
        error: { marks: "must not be empty" }
      });
    } else if (ans === "") {
      this.setState({
        open: true
      });
    }

    const data = {
      questions: JSON.stringify(ques),
      option_1: op1,
      option_2: op2,
      option_3: op3,
      option_4: op4,
      ans: ans,
      marks: marks
    };
    fetch(`http://localhost:7000/admin/addQues/${id}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        response.json().then(re => {
          if (re.success) {
            this.props.quesList(id);

            this.setState({
              ques: "",
              op1: "",
              op2: "",
              op3: "",
              op4: "",
              marks: "",
              ans: "",
              selected: null,
              error: {},
              success: true
            });
            this.handleDialogClose()
          }
        });
      })
      .catch(error => {
        console.log(error);
      });

    // this.setState({openDialog:false});
  };
  selectChange = event => {
    this.setState({ selected: event.target.value });
  };
  handleClose = () => {
    this.setState({ open: false });
    this.setState({ success: false });
  };
  onEditorStateChange = (ques) => {
    this.setState({
      ques,
    });
    console.log(this.state.ques);
    console.log(JSON.stringify(this.state.ques));
    
  };

  render() {
    const { error, open } = this.state;
    const { classes } = this.props
    
    return (
      <div className="">
        <AppBar
          style={{
            top: "auto",
            bottom: 0,
            backgroundColor: "#fff"
          }}
        >
          <Fab
            onClick={this.handleClickOpen}
            style={{
              position: "absolute",
              bottom: 20,
              right: 20
            }}
            color="primary"
            aria-label="add"
          >
            <AddIcon />
          </Fab>

          <div>
            <Dialog
              fullWidth={true}
              maxWidth="false"
              open={this.state.openDialog}
              onClose={this.handleDialogClose}
            >
              <DialogTitle >
                {"Add your question's here"}
              </DialogTitle>

              <DialogContent>
                <Editor
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName={classes.editor}
                  onContentStateChange={this.onEditorStateChange}
                />
                
                
                <Radio
                  checked={this.state.selected === "a"}
                  onChange={this.selectChange}
                  value="a"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "A" }}
                />
                <TextField
                  style={{ width: "19%", margin: "auto 5px" }}
                  value={this.state.op1}
                  onChange={this.handelChange}
                  name="op1"
                  label="Option 1"
                  error={error.option_1 ? true : false}
                  helperText={error.option_1 ? error.option_1 : ""}
                />
                <Radio
                  checked={this.state.selected === "b"}
                  onChange={this.selectChange}
                  value="b"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "B" }}
                />
                <TextField
                  style={{ width: "19%", margin: "auto 5px" }}
                  value={this.state.op2}
                  onChange={this.handelChange}
                  name="op2"
                  label="Option 2"
                  error={error.option_2 ? true : false}
                  helperText={error.option_2 ? error.option_2 : ""}
                />
                <Radio
                  checked={this.state.selected === "c"}
                  onChange={this.selectChange}
                  value="c"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "C" }}
                />
                <TextField
                  style={{ width: "19%", margin: "auto 5px" }}
                  value={this.state.op3}
                  onChange={this.handelChange}
                  name="op3"
                  label="Option 3"
                  error={error.option_3 ? true : false}
                  helperText={error.option_3 ? error.option_3 : ""}
                />
                <Radio
                  checked={this.state.selected === "d"}
                  onChange={this.selectChange}
                  value="d"
                  name="radio-button-demo"
                  inputProps={{ "aria-label": "D" }}
                />
                <TextField
                  style={{ width: "19%", margin: "auto 5px" }}
                  value={this.state.op4}
                  onChange={this.handelChange}
                  name="op4"
                  label="Option 4"
                  error={error.option_4 ? true : false}
                  helperText={error.option_4 ? error.option_4 : ""}
                />
                <TextField
                  style={{ width: "5%", margin: "auto 5px" }}
                  value={this.state.marks}
                  onChange={this.handelChange}
                  name="marks"
                  type="number"
                  label="Marks"
                  error={error.marks ? true : false}
                />
              </DialogContent>
              <DialogActions>
                <Fab
                  autoFocus
                  onClick={this.handleDialogClose}
                  color='secondary'
                  size="medium" variant="extended"
                ><CloseIcon/>
                  Close
                </Fab>
                <Fab onClick={this.handleAddQues} color="primary" size="medium" variant="extended">
                <CheckCircleOutlineIcon/>
                  Add
                </Fab>
              </DialogActions>
            </Dialog>
          </div>

          <Snackbar
            open={open}
            autoHideDuration={1000}
            onClose={this.handleClose}
          >
            <Alert severity="error">Select any answer </Alert>
          </Snackbar>
          <Snackbar
            open={this.state.success}
            autoHideDuration={1000}
            onClose={this.handleClose}
          >
            <Alert severity="success">Successfully added </Alert>
          </Snackbar>
        </AppBar>
      </div>
    );
  }
}
addQues.propTypes = {
  quesList: PropTypes.func.isRequired,
  deleteSuccess: PropTypes.func.isRequired
};
const mapState = state => ({});
const mapActionToProps = {
  quesList,
  deleteSuccess
};
export default connect(mapState, mapActionToProps)(withStyles(useStyles)(addQues));
