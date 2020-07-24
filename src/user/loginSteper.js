import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import { Paper, TextField, CircularProgress, LinearProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { url } from '../config'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),

    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

function getSteps() {
    return ['Input your Roll Number Correctly', 'Input you Exam key provided to you'];
}



export default function VerticalLinearStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const [userID, sUserID] = React.useState('');
    const [examK, sExamK] = React.useState('');
    const [user, sUser] = React.useState({
        userName:'User'
    });

    function getStepContent(step) {

        const userId = (e) => {
            sUserID(e.target.value)
        }
        const examKey = (e) => {
            sExamK(e.target.value)
        }
        switch (step) {
            case 0:
                return <TextField variant='outlined' label="User ID" size='small' value={userID} onChange={userId} />
            case 1:
                return <TextField variant='outlined' label="Exam key" size='small' value={examK} onChange={examKey} />
            default:
                return '';
        }
    }

    const handleNextN = () => {

        const i = {
            id: userID
        }
        fetch(`${url}/login`, {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify(i)
        }).then(res => {
            res.json().then(d => {
                // alert(d.found);
                if (d.found) {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    sUser(d.data[0])

                }
            })
        }).catch(r => console.log(r))
    };
    const handleNextF = () => {

        const i = {
            examKey: examK,
            userClass:user.class
        }
        fetch(`${url}/loginKey`, {
            method: "POST",
            headers: { "Content-Type": "Application/json" },
            body: JSON.stringify(i)
        }).then(res => {
            res.json().then(d => {
                // alert(d.found);
                if (d.found) {
                    setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    // sUser(d.data[0])
                    window.location='/start'

                }
            })
        }).catch(r => console.log(r))
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Typography>
                Welcome {user.userName}
            </Typography>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <div>{getStepContent(index)}</div>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                  </Button>
                  {activeStep === steps.length - 1 ? 
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNextF}
                                        className={classes.button}
                                    >
                                        Start
                                    </Button> :
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNextN}
                                        className={classes.button}
                                    >
                                        Next
                                    </Button>}
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <LinearProgress color="secondary" />
            )}
        </div>
    );
}
