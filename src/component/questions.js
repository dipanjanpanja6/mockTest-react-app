import React, { Component } from 'react'
import {Typography, FormControl, RadioGroup, FormControlLabel, FormLabel,Radio } from '@material-ui/core';



class ques extends Component {
    
    render(){
        const [value, setValue] = React.useState('female');
        const handleChange = event => {
            setValue(event.target.value);
          };
    return (
        <FormControl component="fieldset" >
            <FormLabel component="legend">Q1: How are you?</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
                <FormControlLabel
                    value="disabled"
                    disabled
                    control={<Radio />}
                    label="(Disabled option)"
                />
            </RadioGroup>
        </FormControl>
    )
    }
}
export default ques;

