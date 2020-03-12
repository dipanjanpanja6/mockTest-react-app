import React from 'react'
import { RootRef, Grid, Card, Typography, FormControl, RadioGroup, FormControlLabel, FormLabel,Radio } from '@material-ui/core';
import ques from './questions.js';
import appBar from './appbar';

function Exam() {
    

    return (
        <div>
            <Grid container>
                <Grid direction="row" justify="center" alignContent="flex-start">
                    <Card>
                        <Typography>Answer the following questions</Typography>
                        <Grid direction="column">
                          
                            
                        </Grid>
                    </Card>
                </Grid>
                <Grid direction="row" justify="center" alignContent="flex-end">
                    <Card >
                        <Grid direction="column">
                            <p>hi</p>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
            <appBar/>
            <ques/>
        </div>

    )

}

export default Exam;