import React, { Component } from 'react'
import { Typography,Box, FormControl, RadioGroup, FormControlLabel, FormLabel, Radio, Card } from '@material-ui/core';



class ques extends Component {

    render() {
        // const [value, setValue] = React.useState('female');
        // const handleChange = event => {
        //     setValue(event.target.value);
        //   };
        return (
            <Card style={{margin:"12px",padding:"15px"}}>
                <FormControl component="fieldset" >
                    <Typography>
                        <Box fontWeight="fontWeightBold" lineHeight={5}>
                            Q1: How are you?
                            </Box>
                    </Typography>
                    
                    <RadioGroup aria-label="gender" name="gender1"
                    //  value={value} onChange={handleChange}
                    >
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
            </Card>
        )
    }
}
export default ques;

