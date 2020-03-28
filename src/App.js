import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
// import './App.css';
import AdminLogin from './admin/adminLogin';
import SignIn from './user/clintLogin';
import AppBar from './component/appbar'
import AdminPortal from './admin/adminPanel'
import ExamList from './admin/examList'
import Questions from './admin/questions'
import Student from './admin/students'

import Exam from './user/exam'


import { Provider } from 'react-redux'
import store from './redux/store'


function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <AppBar />
        <Router>

          {/* <Route exact path="/test" component={test} /> */}
          <Route exact path="/admin" component={AdminLogin} />
          <Route exact path="/admin/exam" component={ExamList} />
          <Route exact path="/admin/:examID/questions/" component={Questions} />
          <Route exact path="/dashboard" component={AdminPortal} />
          <Route exact path="/" component={SignIn} />
          <Route exact path="/exam" component={Exam} />
          <Route exact path="/admin/student" component={Student} />

        </Router>
      </Provider>

    </div>
  );
}

export default App;
