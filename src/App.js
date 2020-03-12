import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AdminLogin from './component/adminLogin';
import SignIn from './component/clintLogin';
import Exam from './component/exam';

function App() {

  return (
    <div className="App">
     <Router>
       <Route exact path="/admin/login" component={AdminLogin}/>
       <Route exact path="/login" component={SignIn}/>
       <Route exact path="/exam" component={Exam}/>
     </Router>
    </div>
  );
}

export default App;
