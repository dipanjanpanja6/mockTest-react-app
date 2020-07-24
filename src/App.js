import React from 'react';
import { BrowserRouter as Router,Redirect,Switch, Route} from 'react-router-dom';
// import './App.css';
import AdminLogin from './admin/adminLogin';
import SignIn from './user/clintLogin';
import AppBar from './component/appbar'
import AdminPortal from './admin/adminPanel'
import ExamList from './admin/examList'
import Questions from './admin/questions'
import Student from './admin/students'
import f404 from './404.js'
import Start from './user/exam'
import Exam from './user/exam'


import { Provider } from 'react-redux'
import store from './redux/store'


function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <AppBar />
        <Router>
<Switch>


 
          {/* <Route exact path="/test" component={test} /> */}
          <Route path="/404" component={f404}/>

          <Route exact path="/start" component={Start} />
          <Route exact path="/admin" component={AdminLogin} />
          <Route exact path="/admin/exam" component={ExamList} />
          <Route exact path="/admin/:examID/questions/" component={Questions} />
          <Route exact path="/dashboard" component={AdminPortal} />
          <Route exact path="/" component={SignIn} />
          <Route exact path="/exam" component={Exam} />
          <Route exact path="/admin/student" component={Student} />

          <Redirect to ="/404"/>
</Switch>
        </Router>
      </Provider>

    </div>
  );
}

export default App;
