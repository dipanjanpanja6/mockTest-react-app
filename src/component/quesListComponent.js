import React, { Component } from 'react'
import { Grid, Typography, DialogActions, DialogContent, TextField, Radio, DialogTitle, Dialog, Button, Snackbar, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanel, IconButton, Fab } from '@material-ui/core'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import withStyles from "@material-ui/core/styles/withStyles";
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { quesList, deleteSuccess } from '../redux/action/adminActions';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertFromRaw } from 'draft-js';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = theme => ({
    root: {
        margin: theme.spacing(1)
    },
    list: {
        width: "100%"
    },
    heading: {
        // fontSize: theme.typography.pxToRem(15),
        flexBasis: "75%",
        flexShrink: 0,
        overflow: "hidden"
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
    editor: {
        minHeight: "20vh",
        border: "1px solid #F1F1F1",
        marginBottom: "12px"
    }
});
class quesListItem extends Component {
    constructor() {
        super();

        this.state = {
            success: false,
            ques: null,
            op1: null,
            op2: null,
            op3: null,
            op4: null,
            marks: null,
            ans: null,
            selected: null,
            error: {},
            // open: false,
            success: false,
            openDialog: false,

        };
    }
    handleChange = panel => (event, isExpanded) => { };
    onDelete = () => {

        const { QL } = this.props
        const adminID = localStorage.getItem('admin');
        const examID = QL.exam_id;
        const quesID = QL.id;

        fetch(`http://localhost:7000/${adminID}/${examID}/${quesID}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            res.json()
                .then(res => {
                    console.log(res);
                    if (res.success) {
                        console.log({ examID })

                        this.props.quesList(examID)
                        this.setState({ success: true })
                        this.props.deleteSuccess()
                    }

                })
        })
    }
    onEdit = () => {
        this.setState({ openDialog: true })
    }
    handleDialogClose = () => {
        this.setState({ openDialog: false });
    };
    handelChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    onEditorStateChange = (ques) => {
        this.setState({
            ques,
        });
        console.log(this.state.ques);
        console.log(JSON.stringify(this.state.ques));

    };
    update = () => {
        const { QL } = this.props
        const ques = this.state.ques;
        const op1 = this.state.op1;
        const op2 = this.state.op2;
        const op3 = this.state.op3;
        const op4 = this.state.op4;
        const marks = this.state.marks;
        const selected = this.state.selected;
        const { id } = this.props;

        let ans = ""
        if (selected === 'a') {
            ans = op1
        } else if (selected === 'b') {
            ans = op2
        } else if (selected === 'c') {
            ans = op3;
        } else if (selected === 'd') {
            ans = op4
        }
        if (ques == "") {
            this.setState({
                error: { questions: "must not be empty" }
            })
        }
        else if (op1 == "") {
            this.setState({
                error: { option_1: "must not be empty" }
            })
        }
        else if (op2 == "") {
            this.setState({
                error: { option_2: "must not be empty" }
            })
        }
        else if (op3 == "") {
            this.setState({
                error: { option_3: "must not be empty" }
            })
        }
        else if (op4 == "") {
            this.setState({
                error: { option_4: "must not be empty" }
            })
        }
        else if (marks == "") {
            this.setState({
                error: { marks: "must not be empty" }
            })
        }
        else if (ans === "") {
            this.setState({
                open: true
            })
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
        console.log(this.state);

        console.log(data);

        fetch(`http://localhost:7000/admin/update/${QL.exam_id}/${QL.id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                res.json()
                    .then(res => {
                        console.log(res);
                        if (res.success) {
                            this.props.quesList(QL.exam_id)
                            this.setState({
                                error: {},
                                success: true,
                                openDialog: false
                            })


                        }

                    })
            })
            .catch(res => {
                console.error(res.json());

            })
    }
    edit = () => {
        const { QL } = this.props


        if (QL.ans == QL.option_1) {
            this.setState({ selected: 'a' })
        } else if (QL.ans == QL.option_2) {
            this.setState({ selected: 'b' })
        } else if (QL.ans == QL.option_3) {
            this.setState({ selected: 'c' })
        } else if (QL.ans == QL.option_4) {
            this.setState({ selected: 'd' })
        }
        this.setState({
            ques: JSON.parse(QL.questions),
            op1: QL.option_1,
            op2: QL.option_2,
            op3: QL.option_3,
            op4: QL.option_4,
            marks: QL.marks,
            ans: QL.ans,
        })



    }
    componentDidMount() {
        this.edit()
    }
    handleClose = () => {
        this.setState({ open: false })
        this.setState({ success: false })
    };
    selectChange = event => {
        this.setState({ selected: event.target.value });
    };
    render() {
        const { error } = this.state
        const { classes } = this.props
        const { QL,examId } = this.props
        return (
            <div className={classes.root}>

                <div style={{margin:"12px"}}>
                    <Typography align="right">
                        Remaining Full Marks = {}
                    </Typography>
                </div>

                <ExpansionPanel onChange={this.handleChange("panel1")}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header" >
                        {/* <Typography className={classes.heading}>{QL.questions}</Typography> */}
                        <Editor
                            readOnly
                            toolbarHidden
                            initialContentState={JSON.parse(QL.questions)}
                            editorClassName={classes.heading}
                            wrapperClassName={classes.heading}
                        />
                        <Typography className={classes.secondaryHeading}>{QL.ans}</Typography>
                        <Typography className={classes.marks}>{QL.marks}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container xs={10} >
                            <Grid container item xs={10}>
                                <Grid item xs={5}>{" a) "}{QL.option_1}  </Grid>
                                <Grid item xs={5}>{" b) "}{QL.option_2}  </Grid>
                            </Grid>
                            <Grid container item xs={10}>
                                <Grid item xs={5}> {" c) "} {QL.option_3}  </Grid>
                                <Grid item xs={5}> {" d) "} {QL.option_4}  </Grid>
                            </Grid>
                        </Grid>


                        
                        <Fab onClick={this.onEdit} className={classes.button} size="medium" variant="extended" color="primary">
                            <EditIcon />
edit
                        </Fab>
                        <Fab onClick={this.onDelete} className={classes.button} size='medium' variant="extended" color='secondary'>
                            <DeleteForeverIcon />
                            delete
                        </Fab>


                    </ExpansionPanelDetails>
                </ExpansionPanel>


                <div>

                    <Dialog
                        fullWidth={true}
                        maxWidth="false"
                        open={this.state.openDialog}
                        onClose={this.handleDialogClose}
                        aria-labelledby="responsive-dialog-title"
                    >

                        <DialogTitle id="responsive-dialog-title">{"Edit question here"}</DialogTitle>

                        <DialogContent>

                            <Editor

                                initialContentState={JSON.parse(QL.questions)}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName={classes.editor}
                                onContentStateChange={this.onEditorStateChange}
                            />
                            <Radio
                                checked={this.state.selected === 'a'}
                                onChange={this.selectChange}
                                value="a" name="radio-button-demo" inputProps={{ 'aria-label': 'A' }}
                            />
                            <TextField style={{ width: "19%", margin: "auto 5px" }}
                                value={this.state.op1}
                                onChange={this.handelChange}
                                name="op1" label="Option 1" error={error.option_1 ? true : false} helperText={error.option_1 ? error.option_1 : ""}
                            />
                            <Radio checked={this.state.selected === 'b'}
                                onChange={this.selectChange}
                                value="b" name="radio-button-demo" inputProps={{ 'aria-label': 'B' }}
                            />
                            <TextField style={{ width: "19%", margin: "auto 5px" }}
                                value={this.state.op2}
                                onChange={this.handelChange}
                                name="op2" label="Option 2" error={error.option_2 ? true : false} helperText={error.option_2 ? error.option_2 : ""}
                            /><Radio
                                checked={this.state.selected === 'c'}
                                onChange={this.selectChange}
                                value="c" name="radio-button-demo" inputProps={{ 'aria-label': 'C' }}
                            />
                            <TextField style={{ width: "19%", margin: "auto 5px" }} value={this.state.op3}
                                onChange={this.handelChange}
                                name="op3" label="Option 3" error={error.option_3 ? true : false} helperText={error.option_3 ? error.option_3 : ""}
                            /><Radio checked={this.state.selected === 'd'}
                                onChange={this.selectChange} value="d" name="radio-button-demo" inputProps={{ 'aria-label': 'D' }}
                            />
                            <TextField style={{ width: "19%", margin: "auto 5px" }} value={this.state.op4} onChange={this.handelChange}
                                name="op4" label="Option 4" error={error.option_4 ? true : false} helperText={error.option_4 ? error.option_4 : ""}
                            />
                            <TextField
                                style={{ width: "5%", margin: "auto 5px" }} value={this.state.marks} onChange={this.handelChange} name="marks" type="number" label="Marks" error={error.marks ? true : false}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Fab onClick={this.handleDialogClose} color='secondary' size="medium" variant="extended" ><CloseIcon/>
                                Close
                </Fab>
                            <Fab onClick={this.update} color="primary" autoFocus size="medium" variant="extended" >
                            <CheckCircleOutlineIcon/>
                            Update
                </Fab>
                        </DialogActions>
                    </Dialog>

                    <Snackbar open={this.state.success} autoHideDuration={1000} onClose={this.handleClose} >
                        <Alert severity="success">
                            Successfully updated </Alert>
                    </Snackbar>
                </div>


            </div>
        )
    }
}
quesListItem.propTypes = {
    quesList: PropTypes.func.isRequired,
    deleteSuccess: PropTypes.func.isRequired
}
const mapState = (state) => ({

})
const mapActionToProps = {
    quesList,
    deleteSuccess
}
export default connect(mapState, mapActionToProps)(withStyles(useStyles)(quesListItem));

