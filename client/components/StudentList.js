import React, { Component } from 'react';
import Student from './Student';
import NewStudentEntry from './NewStudentEntry';
import store from '../store';

export default class StudentList extends Component {

  constructor() {
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {

    const campusId = Number(this.props.match.params.campusId); // because it's a string "1", not a number!
    const students = this.state.students;
    const filteredStudents = students.filter(student => student.campusId === campusId);

    return (
      <div>
        <ul className="media-list">
          {filteredStudents.map(student => <Student student={student} key={student.id} id={student.id} />)}
        </ul>
        <NewStudentEntry campusId={campusId} />
      </div>
    );
  }
}
