import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import Student from './Student';

const AllStudents = props => (
  <div className="home">
    <div className="banner text-center text-inverted">
      <h1>All Registered Students</h1>
    </div>
    <br />
    <div className="media-heading large-font text-center">
      <ul className="list-unstyled">
        {
          props.students.map(student => <Student student={student} key={student.id} id={student.id} />)
        }
      </ul>
    </div>
  </div>
);

const mapStateToProps = state => ({
  students: state.students
});


const Container = withRouter(connect(
  mapStateToProps
)(AllStudents))

export default Container;


