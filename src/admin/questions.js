import React, { Component } from 'react'
import { Grid, Paper, Snackbar } from '@material-ui/core'
import PropType from 'prop-types'
import { connect } from 'react-redux'
import withStyles from "@material-ui/core/styles/withStyles";
import AddQuestion from '../component/addQuesComponent'
import QuesList from '../component/quesListComponent'
import { checkAdmin, setLogin, quesList,deleteSuccessNull } from '../redux/action/adminActions'
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = theme => ({
    root: {
        margin: theme.spacing(1)
    },
    list: {
        width: "100%",

    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: "75%",
        flexShrink: 0
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: "33.33%",
        color: theme.palette.text.secondary
    },
    marks: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary
    },
    button: { margin: theme.spacing(1) },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    }
});

class examEdit extends Component {
    constructor() {
        super();
        this.state = {
            quesList: null,
            open: false
        }
    }
    componentWillMount() {
        
        const id = this.props.match.params.examID
        
        this.props.quesList(id)
    }
    componentWillReceiveProps(nextProps, context) {
        if (nextProps.admin.quesData) {
            this.setState({ quesList: nextProps.admin.quesData });
        }
        if (nextProps.admin.deleteQuesSuccess === true) {
            console.log(nextProps.admin.deleteQuesSuccess)
            this.setState({ open: true })
        }

    }
    handleClose = () => {

        this.setState({ open: false })
        this.props.deleteSuccessNull()
    };

    handleChange = panel => (event, isExpanded) => { };
    render() {
        const { quesList } = this.state;
        console.log({ quesList });
        let quesions = quesList
            ? quesList.map(quesions => (
                <QuesList key={(Math.random() * 25)} QL={quesions} />
            ))
            : ""
        const id = this.props.match.params.examID
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Snackbar open={this.state.open} autoHideDuration={1000} onClose={this.handleClose} >
                    <Alert severity="success">
                        Question deleted </Alert>
                </Snackbar>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            {quesions}
                        </Paper>
                    </Grid>

                    <AddQuestion id={id} />

                </Grid>
            </div>

        )
    }
}
examEdit.propType = {

    checkAdmin: PropType.func.isRequired,
    classes: PropType.object.isRequired,
    setLogin: PropType.func.isRequired,
    quesList: PropType.func.isRequired,
    deleteSuccessNull: PropType.func.isRequired
}
const mapState = (state) => ({
    admin: state.admin
})
const mapActionToProps = {
    checkAdmin,
    setLogin,
    quesList,
    deleteSuccessNull
}

export default connect(mapState, mapActionToProps)(withStyles(useStyles)(examEdit))
