import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import CampusView from './CampusView';
import Student from './Student';
import NewCampusEntry from './NewCampusEntry';
import StudentView from './StudentView';
import store, { fetchStudents, fetchCampuses } from '../store';
import Home from './Home';
import AllCampuses from './AllCampuses';
import ErrorPage from './ErrorPage';
import AllStudents from './AllStudents';

export default class Main extends Component {

  componentDidMount() {
    const studentsThunk = fetchStudents();
    const campusesThunk = fetchCampuses();
    store.dispatch(campusesThunk);
    store.dispatch(studentsThunk);
  }

  render() {
    return (
      <div>
        <Sidebar />
        <Navbar />
        <main>
          <Switch>
            <Route path="/new-campus" component={NewCampusEntry} />
            <Route path="/campuses/:campusId" component={CampusView} />
            <Route path="/students/:studentId" component={StudentView} />
            <Route path="/students" component={AllStudents} />
            <Route exact path="/" component={Home} />
            <Route exact path="/campuses" component={AllCampuses} />
            <Route component={ErrorPage} />
          </Switch>
        </main>
      </div>
    );
  }
}


