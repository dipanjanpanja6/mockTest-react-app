import React, { Component } from "react";
import { Grid,Box, Radio, AppBar, Fab, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

class addQues extends Component {
  constructor() {
    super();
    this.state = {
      ques: null,
      op1: null,
      op2: null,
      op3: null,
      op4: null,
      marks: null,
      ans: null,
      selected: null
    };
  }
  handelChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleAddQues = () => {
    const ques = this.state.ques;
    const op1 = this.state.op1;
    const op2 = this.state.op2;
    const op3 = this.state.op3;
    const op4 = this.state.op4;
    const marks = this.state.marks;
    const selected = this.state.selected;

    let ans = ""
    if(selected === 'a'){
      ans = op1
    }else if(selected==='b'){
      ans=op2
    }else if(selected==='c'){
      ans=op3;
    }else if(selected==='d'){
      ans=op4
    }

    const data = {
      questions:ques,
      option_1:op1,
      option_2:op2,
      option_3:op3,
      option_4:op4,
      ans:ans,
      marks:marks
    };
  };
  selectChange = event => {
    this.setState({selected:event.target.value});
  };

  render() {
    return (
      <div className="">
        <AppBar
          style={{
            top: "auto",
            bottom: 0,
            backgroundColor: "#fff"
          }}
        >
          <Fab
            onClick={this.handleAddQues}
            style={{
              position: "absolute",
              bottom: 180,
              right: 20
            }}
            color="secondary"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
          <Grid container style={{padding:"20px"}}>
            <TextField
              multiline
              rowsMax="3"
              value={this.state.ques}
              name="ques"
              onChange={this.handelChange}
              style={{
                width: "100%",
                paddingTop: "10px",
                paddingBottom: "10px"
              }}
              id="addQues"
              label="Type your question here"
            />
            <Radio
              checked={this.state.selected === 'a'}
              onChange={this.selectChange}
              value="a"
              name="radio-button-demo"
              inputProps={{ 'aria-label': 'A' }}
            />
            <TextField
              style={{ width: "19%", margin: "auto 5px" }}
              value={this.state.op1}
              onChange={this.handelChange}
              name="op1"
              label="Option 1"
            />
            <Radio
              checked={this.state.selected === 'b'}
              onChange={this.selectChange}
              value="b"
              name="radio-button-demo"
              inputProps={{ 'aria-label': 'B' }}
            />
            <TextField
              style={{ width: "19%", margin: "auto 5px" }}
              value={this.state.op2}
              onChange={this.handelChange}
              name="op2"
              label="Option 2"
            /><Radio
            checked={this.state.selected === 'c'}
            onChange={this.selectChange}
            value="c"
            name="radio-button-demo"
            inputProps={{ 'aria-label': 'C' }}
          />
            <TextField
              style={{ width: "19%", margin: "auto 5px" }}
              value={this.state.op3}
              onChange={this.handelChange}
              name="op3"
              label="Option 3"
            /><Radio
            checked={this.state.selected === 'd'}
            onChange={this.selectChange}
            value="d"
            name="radio-button-demo"
            inputProps={{ 'aria-label': 'D' }}
          />
            <TextField
              style={{ width: "19%", margin: "auto 5px" }}
              value={this.state.op4}
              onChange={this.handelChange}
              name="op4"
              label="Option 4"
            />
            
            
            <TextField
              style={{ width: "5%", margin: "auto 5px" }}
              value={this.state.marks}
              onChange={this.handelChange}
              name="marks"
              type="number"
              label="Marks"
            />
            
          </Grid>
        </AppBar>
      </div>
    );
  }
}
export default addQues;
