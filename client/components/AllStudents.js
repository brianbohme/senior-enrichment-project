import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Student from './Student';

/* This component renders a basic list of all students */

/* -----------------    COMPONENT     ------------------ */

const AllStudents = props => (
  <div className="home">
    <div className="banner text-center text-inverted">
      <h1>All Registered Students</h1>
    </div>
    <br />
    <div className="media-heading large-font text-center">
      <ul className="list-unstyled">
        {
          props.students.map(student => <Student student={student} key={student.id} />)
        }
      </ul>
    </div>
  </div>
);

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = state => ({
  students: state.students
});


const Container = withRouter(connect(
  mapStateToProps
)(AllStudents))

export default Container;


