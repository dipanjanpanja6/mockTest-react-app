import React, { Component } from "react";
import {  AppBar,  List,  Dialog,  DialogActions,  DialogContent,  DialogTitle,  ListItem,  ListItemText,  Divider,  Toolbar,  Drawer,  Button,  IconButton,  Typography,  InputBase,TextField} from "@material-ui/core";
import {  createFilterOptions} from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import MenuIcon from "@material-ui/icons/Menu";
import PropsTypes from "prop-types";
import { connect } from "react-redux";
import withStyle from "@material-ui/core/styles/withStyles";
import { fade } from "@material-ui/core/styles";
import { addClass, classData,addClassSuccessNull,addClassErrorNull } from "../redux/action/adminActions";
const filter = createFilterOptions();
const style = theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: "10px"
  },
  home: { flexGrow: "1", marginRight: "10px" },
  title: {
    flexGrow: 1
  },
  appbar: {
    zIndex: 999
  },
  list: theme.mixins.Toolbar,
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",

    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "40ch"
      }
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});
class bAppBar extends Component {
  constructor() {
    super();
    this.state = {
      addIconShow: true,
      login: false,
      left: false,
      show: false,
      classD: null,
      classA:"",
      classAE:null
    };
  };
  componentDidMount(){
    this.props.classData();

  };
  componentWillReceiveProps(nextProps, context) {
    if (nextProps.admin.login === true) {
      this.setState({
        login: true
      });
    }
    if (nextProps.admin.login === false) {
      this.setState({
        login: false
      });
    }
    if (nextProps.admin.classData) {
      this.setState({ classD: nextProps.admin.classData });
    }
    if(nextProps.admin.addClassSuccess===true){
      this.setState({
        classAE:null,
        classA:""
      })
    }
    if(nextProps.admin.classAE){
      this.setState({classAE:nextProps.admin.classAE})
    }
  };
  handleLogout = () => {
    localStorage.clear("admin");
    window.location = "/admin";
  };
  toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    this.setState({ ...this.state, [side]: open });
  };
  onClick = () => {
    window.location = "/dashboard";
  };
  examClick = () => {
    window.location = "/admin/exam";
  };
  studentClick = () => {
    window.location = "/admin/student";
  };
  sideList = side => (
    <div
      // className={classes.list}
      style={{ width: "250px", paddingTop: "65px" }}
      role="presentation"
      onClick={this.toggleDrawer(side, false)}
      onKeyDown={this.toggleDrawer(side, false)}
    >
      <List>
        <ListItem button onClick={this.onClick} key="dashboard">
          <ListItemText primary={"Dashboard"} />
        </ListItem>
        <ListItem button onClick={this.examClick} key="exam">
          <ListItemText primary={"Exam"} />
        </ListItem>
        <ListItem button onClick={this.studentClick} key="exam">
          <ListItemText primary={"Student's"} />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
  show = () => {
    this.setState({
      show: true
    });
  };
  handleDialogClose = () => {
    this.setState({
      show: false,
      classAE:"",
      classA:""
    });
    this.props.addClassSuccessNull();
    this.props.addClassErrorNull()
  };
  handleAddBatch = (event) => {
    event.preventDefault()
    if(this.state.classA!=""){
    this.props.addClass({class:this.state.classA});
    
  } else{
    this.setState({classAE:"must not be empty"})
  }
};
  handleChange=event=>{
    this.setState({
      [event.target.id]: event.target.value
    })
  }
  render() {
    const { classes } = this.props;
    const {classD}=this.state;
    // console.log(classD);
    return (
      <div style={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          className={classes.appbar}
          style={{ backgroundColor: "#a00" }}
        >
          <Toolbar>
            <IconButton
              onClick={this.toggleDrawer("left", true)}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" className={classes.home}>
              Home
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div style={{ flexGrow: "1" }}></div>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              onClick={this.show}
            >
              <AddIcon />
            </IconButton>

            {this.state.login === true && (
              <Button
                // style={{ right: "20px", position: "absolute" }}
                onClick={this.handleLogout}
                color="inherit"
              >
                LogOut
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          style={{ zIndex: "500" }}
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          {this.sideList("left")}
        </Drawer>
        <div>
          <Dialog
            // fullScreen={this.fullScreen}
            open={this.state.show}
            onClose={this.close}
            aria-labelledby="responsive-dialog-title"
          >
            <form onSubmit={this.handleAddBatch}>
            <DialogTitle>{"Add Batch"}</DialogTitle>
            <DialogContent>
              
                  <TextField
                    helperText={this.state.classAE ? this.state.classAE:null}
                    error={this.state.classAE ?true:false}
                    style={{ width: 300 }}
                    label="Batch name"
                    variant="standard"
                    value={this.state.classA}
                    id="classA"
                    onChange={this.handleChange}
                    
                  />
                
              
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={this.handleDialogClose}
                color="primary"
              >
                Close
              </Button>
              <Button  color="primary" type="submit" autoFocus>
                Add
              </Button>
            </DialogActions>
              </form>
          </Dialog>
        </div>
      </div>
    );
  }
};
bAppBar.PropsTypes = {
  admin: PropsTypes.object.isRequired,
  classes: PropsTypes.object.isRequired,
  addClass: PropsTypes.func.isRequired,
  classData:PropsTypes.func.isRequired,
  addClassSuccessNull:PropsTypes.func.isRequired,
  addClassErrorNull:PropsTypes.func.isRequired
};
const mapState = state => ({
  admin: state.admin
});
const mapActionToProps = {
  addClass,
  classData,
  addClassSuccessNull,addClassErrorNull
};
export default connect(mapState, mapActionToProps)(withStyle(style)(bAppBar));