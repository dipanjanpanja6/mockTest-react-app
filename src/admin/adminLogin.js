import React, { Component } from 'react';
import { CircularProgress, Avatar, Button,  TextField, Link, Box, Typography, Paper } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PropType from 'prop-types'
import { connect } from 'react-redux'
import withStyles from "@material-ui/core/styles/withStyles";
import Background from '../component/background';
//actions
import { loginAdmin, checkAdmin, setAdminNull } from '../redux/action/adminActions'


const style = theme => ({
    paper: {
        marginTop:'-160px',
        marginLeft:'-200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width:theme.spacing(50),
        position:'absolute',
        top:"50%",
        left:'50%'
    },
    avatar: {
        margin: theme.spacing(5,0,1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '70%',
    },
    submit: {
        position: "relative",
        margin: theme.spacing(3,0, 5),
    },
    head:{
        backgroundColor:"green",
        alignItems:'center',
        display:'flex',
        flexDirection:'column',
        width:'100%'
    }
})
class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            userId: "",
            password: "",
            error: null,
            userError: null,
            passError: null,
            loading: false,
            disable: false
        }

    }
    componentWillReceiveProps(nextProps, context) {
        if (nextProps.admin.loginError) {
            this.setState({
                error: nextProps.admin.loginError,
                loading: false,
                disable: false
            })
        }
        if (nextProps.admin.passwordError) {
            this.setState({
                passError: nextProps.admin.passwordError,
                loading: false,
                disable: false
            })
        }
        if (nextProps.admin.userNameError) {
            this.setState({
                userError: nextProps.admin.userNameError,
                loading: false,
                disable: false
            })
        }
    }
    login = (event) => {
        this.setState({ loading: true, disable: true })
        event.preventDefault()
        const { userId, password } = this.state
        const data = {
            userName: userId,
            password: password
        }
        this.props.loginAdmin(data, this.props.history)
    }
    componentWillMount() {
        localStorage.clear('admin')
        this.props.setAdminNull()
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        const { classes } = this.props
        return (
            <div>
                <Background />
                <Paper className={classes.paper}>
                    
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                        </Typography>
                        
                    <form onSubmit={this.login} className={classes.form} noValidate>
                        <TextField helperText={this.state.userError != null && this.state.userError} variant="standard" margin="none" fullWidth id="userId" label="User" name="userId" autoFocus onChange={this.handleChange} />
                        <TextField helperText={this.state.passError != null && this.state.passError}
                            onChange={this.handleChange}
                            variant="standard"
                            margin="dense"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                        />
                            <Typography color='error' variant='caption'>{this.state.error != null && this.state.error}</Typography>
                        <Button
                            type="submit"
                            fullWidth
                            color='primary'
                            variant="contained"
                            disabled={this.state.disable}
                            className={classes.submit} >
                            {this.state.loading === true && <CircularProgress style={{ position: "absolute" }} />}

                            Sign In
                            </Button>
                    </form>

                </Paper>
                
                <Box >
                    <Typography style={{position:'absolute',bottom:'0',left:'20%',right:'20%'}} variant="body2" color="textSecondary" align="center">
                        {'New user! Contact server administrator'}<br/>
                        


                        {'Copyright © '}
                        <Link color="inherit" href="#">
                            Dipanjan Panja
                    </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Box>
            </div>
        )
    };

}
SignIn.propType = {
    loginAdmin: PropType.func.isRequired,
    classes: PropType.object.isRequired,
    admin: PropType.object.isRequired,
    checkAdmin: PropType.func.isRequired,
    setAdminNull
}
const mapState = (state) => ({
    admin: state.admin
})
const mapActionToProps = {
    loginAdmin,
    checkAdmin,
    setAdminNull
}

export default connect(mapState, mapActionToProps)(withStyles(style)(SignIn))
