import React,{useState} from 'react'

import {  Box, Grid, Typography } from '@material-ui/core';
import Ques from './questions';
import Fullscreen from "react-full-screen";
import QList from '../component/quesList';
import ExamStepper from './examStepper'

function Exam() {
const[isFull,setFull]=React.useState(false)

    return (
        <div style={{margin:'12px'}}>
            {/* <Fullscreen
          enabled={isFull}
          onChange={setFull()}
        > */}
            {/* <Grid  container spacing={3}> */}
             <ExamStepper/>
            {/* </Grid> */}
            
            {/* </Fullscreen> */}
        </div>

    )

}

export default Exam;