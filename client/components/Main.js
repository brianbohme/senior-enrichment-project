import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import StudentList from './StudentList';
import Student from './Student';
import NewCampusEntry from './NewCampusEntry';
import StudentView from './StudentView';
import store, { fetchStudents, fetchCampuses } from '../store';

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
            <Route path="/campuses/:campusId" component={StudentList} />
            <Route path="/students/:studentId" component={StudentView} />
            <Redirect to="/campuses/1" />
          </Switch>
        </main>
      </div>
    );
  }
}


            // <Route path="/students/:studentId" component={StudentView} />
