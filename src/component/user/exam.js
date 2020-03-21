import React from 'react'

import {  Box, Grid, Typography } from '@material-ui/core';
import Ques from '../questions';
import QList from '../quesList';


function Exam() {


    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={9} direction="row"justify="space-between" alignContent="flex-start">
                    <Grid direction="column" justify="flex-start" alignContent="flex-start">
                        <Typography>
                            <Box style={{marginLeft:"20px"}} fontWeight="fontWeightBold" lineHeight={3}>
                                Answer the following questions
                            </Box>
                        </Typography>
                        <Grid direction="column">

                            <Ques />
                            

                        </Grid>
                    </Grid>
                </Grid>
                <Grid xs={3} direction="row" justify="center" alignContent="flex-end">
                    <Grid  direction="column" justify="center" alignItems="flex-start" alignContent="flex-start">
                        <QList/>
                    </Grid>
                </Grid>
            </Grid>
            
           
        </div>

    )

}

export default Exam;