import React, { Component } from 'react'
import {Grid, Typography} from '@material-ui/core'

import PropType from 'prop-types'
import { connect } from 'react-redux'
import withStyles from "@material-ui/core/styles/withStyles";
import AddQuestion from './addQues'


import{checkAdmin, setLogin} from '../../redux/action/adminActions'

const style = {}

class adminPanel extends Component{
    componentWillMount(){
        this.props.checkAdmin(this.props.history)
        this.props.setLogin()
    }
render(){
    return(
        <div className="root">
            <Grid container>
                <Grid item>
                    <Typography>
                        sucsess!
                    </Typography>
                </Grid>
                
            </Grid>
        </div>
        
    )
}
}
adminPanel.propType = {
    
    checkAdmin:PropType.func.isRequired,
    classes:PropType.object.isRequired,
    setLogin:PropType.func.isRequired
}
const mapState = (state) => ({

})
const mapActionToProps = {
   checkAdmin,
   setLogin
}

export default connect(mapState, mapActionToProps)(withStyles(style)(adminPanel))
