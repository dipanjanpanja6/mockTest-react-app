
import React, { Component } from 'react';
import { AppBar,List,ListItem,ListItemText,Divider,Toolbar, Drawer,Button,IconButton, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PropsTypes from 'prop-types'
import { connect } from 'react-redux'

import withStyle from '@material-ui/core/styles/withStyles'



const style = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: "20px",
  },
  title: {
    flexGrow: 1,
  },
}

class bAppBar extends Component {

  constructor() {
    super();
    this.state = {
      login: false,
      left: false
    }
  }
  componentWillReceiveProps(nextProps, context) {
    if (nextProps.admin.login === true) {
      this.setState({
        login: true
      })
    }
    if (nextProps.admin.login === false) {
      this.setState({
        login: false
      })
    }
  }
  handleLogout = () => {
    localStorage.clear('admin')
    window.location = '/admin'
  }
  toggleDrawer = (side, open)=> event =>{
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({ ...this.state, [side]: open });
  } 
onClick=()=>{window.location='/dashboard'}
examClick=()=>{window.location='/admin/exam'}
  sideList = side => (
    <div
      // className={classes.list}
      style={{width:"250px"}}
      role="presentation"
      onClick={this.toggleDrawer(side, false)}
      onKeyDown={this.toggleDrawer(side, false)}
    >
      <List>
        
          <ListItem  button onClick={this.onClick} key='dashboard'>
            <ListItemText primary={'Dashboard'} />
          </ListItem>
          <ListItem  button onClick={this.examClick} key='exam'>
            <ListItemText  primary={'Exam'} />
          </ListItem>
        
      </List>
      <Divider />
      
    </div>
  );
  
  render() {
    const { classes } = this.props
    return (
      <div style={{ flexGrow: 1 }}>
        <AppBar position="static" style={{backgroundColor:"#f44336" }}>
          <Toolbar>
            <IconButton onClick={this.toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Home
          </Typography>
            {this.state.login === true &&
              <Button style={{ right: "20px", position: "absolute" }} onClick={this.handleLogout} color="inherit">LogOut</Button>}
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          {this.sideList('left')}
        </Drawer>
      </div>
    );
  }
}

bAppBar.PropsTypes = {
  admin: PropsTypes.object.isRequired,
  classes: PropsTypes.object.isRequired
}
const mapState = (state) => ({
  admin: state.admin
})
const mapActionToProps = {

}
export default connect(mapState, mapActionToProps)(withStyle(style)(bAppBar))