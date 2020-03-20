import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AdminLogin from './component/admin/adminLogin';
import SignIn from './component/user/clintLogin';
import AppBar from './component/appbar'
import AdminPortal from './component/admin/adminPanel'
import ExamList from './component/admin/examList'
import examEdit from './component/admin/examEdit'

import Exam from './component/user/exam'

import { Provider } from 'react-redux'
import store from './redux/store'


function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <AppBar />
        <Router>
          <Route exact path="/admin" component={AdminLogin} />
          <Route exact path="/admin/exam" component={ExamList} />
          <Route exact path="/admin/examEdit/:examID" component={examEdit} />
          <Route exact path="/dashboard" component={AdminPortal} />
          <Route exact path="/" component={SignIn} />
          <Route exact path="/exam" component={Exam} />

        </Router>
      </Provider>

    </div>
  );
}

export default App;
