import React, { useState } from 'react';
import { Link, Typography, Container, CssBaseline, Avatar, TextField, Button, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import Particles from 'react-particles-js';
import { url } from '../config'
import LoginSteper from './loginSteper'


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Dipanjan Panja
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    root:{
        margin:"20px"
    }
}));

export default function SignIn() {
    const classes = useStyles();
    const [key, setKey] = React.useState("")
    const [id, setId] = React.useState("")
    const submit = (e) => {
        e.preventDefault()
        fetch(`${url}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: id,
                key: key
            }),
        }).then(res => {
            res.json().then(d => {
                console.log(d);
            })
        })
    }
    return (
        <div className={classes.root}  >
            <Container component="main" maxWidth="xs" >
                <LoginSteper />

                <Box mt={15}>
                    <Copyright />
                </Box>
            </Container>
        </div>
    );
}