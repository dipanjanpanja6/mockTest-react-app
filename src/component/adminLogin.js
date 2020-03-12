import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import './adminLogin.css'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import appBar from './appbar'

const useStyles = makeStyles({

})

class AdminLogin extends Component {
    render() {
        return (
            <div className="root">
            <appBar/>

                        <Card style={{marginTop:"25vh",backgroundColor:"whitesmoke",minWidth:750}}>
                            <h1>Administrator Login </h1>
                            <form noValidate autoComplete="off">
                                <TextField id="standard-basic" label="User name" />
                                <br/>
                                <br/>
                                <TextField id="standard-basic" label="Password" />
                                <br/>
                                <br/>
                                <Button variant="contained" color="primary">
                                    Login
                                </Button>
                                <br/>
                                <p>New Admin!</p>
                            </form>
                        </Card>




            </div>
        )
    }

}
export default AdminLogin;