import React, { Component } from 'react';
import { CircularProgress,Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PropType from 'prop-types'
import { connect } from 'react-redux'
import withStyles from "@material-ui/core/styles/withStyles";


import createMuiTheme from "@material-ui/core/styles/createMuiTheme";


//actions
import { loginAdmin, checkAdmin, setAdminNull } from '../../redux/action/adminActions'

const theme = createMuiTheme({

})

const style = {
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        position:"relative",
        margin: "20px auto",
        margin: theme.spacing(3, 0, 2),
    },
}





class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            userId: "",
            password: "",
            error: null,
            userError: null,
            passError: null,
            loading:false,
            disable:false
        }

    }
    componentWillReceiveProps(nextProps, context) {
        if (nextProps.admin.loginError) {
            this.setState({
                error: nextProps.admin.loginError,
                loading:false,
                disable:false
            })
        }
        if (nextProps.admin.passwordError) {
            this.setState({
                passError: nextProps.admin.passwordError,
                loading:false,
                disable:false
            })
        }
        if (nextProps.admin.userNameError) {
            this.setState({
                userError: nextProps.admin.userNameError,
                loading:false,
                disable:false
            })
        }
    }
    login = (event) => {
        this.setState({loading:true, disable:true})
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
            <Container component="main" maxWidth="xs" >
                <CssBaseline />

                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                        </Typography>
                    <form onSubmit={this.login} className={classes.form} noValidate>
                        <TextField helperText={this.state.userError != null && this.state.userError}
                            variant="standard"
                            margin="normal"
                            fullWidth
                            id="userId"
                            label="User"
                            name="userId"
                            autoComplete="userId"
                            autoFocus
                            onChange={this.handleChange}

                        />
                        <TextField  helperText={this.state.passError != null && this.state.passError}
                            onChange={this.handleChange}
                            variant="standard"
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            disabled={this.state.disable}
                            className={classes.submit}
                        >
                            {this.state.loading===true && <CircularProgress style={{position:"absolute"}}/>}
                            
                            Sign In
                            </Button>
                            <Typography style={{color:"red"}}>{this.state.error != null && this.state.error}</Typography>
                    </form>
                    <Grid item xs>
                        
                        <p>New user! Contact server administrator</p>
                    </Grid>
                </div>
                <Box style={{marginTop:"20%"}}>
                    <Typography variant="body2" color="textSecondary" align="center">
                        {'Copyright © '}
                        <Link color="inherit" href="#">
                            Dipanjan Panja
                    </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Box>
            </Container>
        );
    }

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
