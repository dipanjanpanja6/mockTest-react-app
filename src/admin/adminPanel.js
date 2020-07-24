import React, { Component } from "react";
import {
  Typography,
  Card, List,
  ListItemSecondaryAction,
  CardHeader,
  CardContent,
  CardActions,
  ListItem,
  ListItemText,
  Grid,
  Fab,
  Divider,
  ListItemAvatar,
  Chip
} from "@material-ui/core";

import PropType from "prop-types";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Background from "../component/background";
import CardMedia from "@material-ui/core/CardMedia";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import PieChartIcon from '@material-ui/icons/PieChart';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ClassIcon from '@material-ui/icons/Class';
import SubjectIcon from '@material-ui/icons/Subject';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import { Pie } from 'react-chartjs-2';
import { checkAdmin, setLogin } from "../redux/action/adminActions";

const data = {
  labels: [
    '>6.0',
    '>7.0',
    '>8.0',
    '>9.0',
    '<6.0'
  ],
  datasets: [{
    data: [300, 90, 100, 200, 20],
    backgroundColor: [
      '#777',
      '#09f',
      '#9f0',
      '#f90',
      '#000'
    ],
    hoverBackgroundColor: [
      '#333',
      '#00f',
      '#0f0',
      '#f00',
      '#000'
    ]
  }]
};

class adminPanel extends Component {
  componentDidMount() {
    this.props.checkAdmin(this.props.history);
    this.props.setLogin();
  }
  render() {
    const { classes } = this.props;
    return (
      <div className="root">
        <Background />
        <Grid container justify='center' alignItems='flex-start' className={classes.grid}>
          <Grid item>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar variant='rounded' className={classes.avatar}>
                    <WatchLaterIcon fontSize='large' color='primary' />
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Upcoming exams"
                subheader={new Date().toDateString()}
              />
              <Divider />
              <CardContent style={{ padding: 0 }}>

                <List >
                  <ListItem button>
                    <ListItemAvatar>
                      <SubjectIcon />
                    </ListItemAvatar>
                    <ListItemText primary="1st Med Term" secondary={new Date().toDateString()} />
                    <ListItemSecondaryAction>
                      <PauseIcon />
                    </ListItemSecondaryAction>
                  </ListItem>

                  <ListItem button>
                    <ListItemAvatar>
                      <SubjectIcon />
                    </ListItemAvatar>
                    <ListItemText primary="1st Med Term" secondary={new Date().toDateString()} />
                    <ListItemSecondaryAction>
                      <PlayArrowIcon />
                    </ListItemSecondaryAction>
                  </ListItem>



                </List>
              </CardContent>
              <Divider />

              <CardActions>

                <Fab color='primary' variant='extended' size='medium' style={{ marginLeft: 'auto' }}>
                  <ChevronRightIcon />
                </Fab>
              </CardActions>

            </Card>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <ClassIcon fontSize='large' color='primary' />
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Results"
                subheader={new Date().toDateString()}
              />
              <Divider />
              <CardContent style={{ padding: 0 }}>

                <List >
                  <ListItem button>
                    <ListItemAvatar>
                      <SubjectIcon />
                    </ListItemAvatar>
                    <ListItemText primary="1st Med Term" secondary={new Date().toDateString()} />
                    <ListItemSecondaryAction>
                      <Chip color="secondary" variant='outlined' label="R17-CSE" />
                      <Chip color='secondary' variant='outlined' label="R17-IT" />


                    </ListItemSecondaryAction>
                  </ListItem>

                  <ListItem button>
                    <ListItemAvatar>
                      <SubjectIcon />
                    </ListItemAvatar>
                    <ListItemText primary="2nd Med Term" secondary={new Date().toDateString()} />
                    <ListItemSecondaryAction>

                      <Chip color='secondary' variant='outlined' label="R17-CSE" />
                    </ListItemSecondaryAction>
                  </ListItem>



                </List>
              </CardContent>
              <Divider />

              <CardActions>

                <Fab color='primary' variant='extended' size='medium' style={{ marginLeft: 'auto' }}>
                  <ChevronRightIcon />
                </Fab>
              </CardActions>

            </Card>

          </Grid>
          <Grid item>

            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar variant='rounded' className={classes.avatar}>
                    <PieChartIcon fontSize='large' color='primary' />
                  </Avatar>
                }
                action={
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Previous exam statistic"
                subheader={new Date().toDateString()}
              />

              <CardContent>
                <Pie data={data} width={400} height={400} />


              </CardContent>


            </Card>


          </Grid>
          <Grid item>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <SubjectIcon />
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Notes for you"
                subheader={new Date().toDateString()}
              />

              <CardContent>
                <div style={{ height: "100vh" }}>
                  <Chip style={{  margin:'3px' }}  variant='outlined' color='secondary' label="Next exam in tow day's" />
                  <Chip style={{margin:'3px'}} variant='outlined' color='secondary' label="Next exam" />
                  <Chip style={{  margin:'3px' }}  variant='outlined' color='secondary' label="Send me the attendance of student's" />
                  <Chip style={{  margin:'3px' }}  variant='outlined' color='secondary' label="Previous exam results are to poor" />
                  <Chip style={{  margin:'3px' }}  variant='outlined' color='secondary' label="Next exam in tow day's" />
                  <Chip style={{  margin:'3px' }}  variant='outlined' color='secondary' label="Next exam in tow day's" />
                  <Chip style={{  margin:'3px' }}  variant='outlined' color='secondary' label="Next exam in tow day's" />
                  <Chip style={{  margin:'3px' }}  variant='outlined' color='secondary' label="Next exam in tow day's" />
                </div>
              </CardContent>


            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const style = theme => ({
  grid: {
    // display:"flex",

  },
  card: {
    maxHeight: "500px",
    width: "410px",
    margin: "12px",

  },
  cardHolder: {
    padding: "20px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: 'transparent'
  }
});
adminPanel.propType = {
  checkAdmin: PropType.func.isRequired,
  classes: PropType.object.isRequired,
  setLogin: PropType.func.isRequired
};
const mapState = state => ({});
const mapActionToProps = {
  checkAdmin,
  setLogin
};

export default connect(mapState, mapActionToProps)(withStyles(style)(adminPanel));
