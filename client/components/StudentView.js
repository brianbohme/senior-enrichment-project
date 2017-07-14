import React from 'react';
import { connect } from 'react-redux';
import { updateStudents, removeStudents } from '../store';
import _ from 'lodash';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

/* This component renders the student's individual view, including updating their info or deleting them. */


/* -----------------    COMPONENT     ------------------ */

class UpdateStudent extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  renderCampus() {

  }

  render() {
    const { student, campuses } = this.props;
    const campusCopy = Object.assign({}, campuses);
    const studentCopy = Object.assign({}, student);
    const campus = _.find(campusCopy, campus => campus.id === student.campusId);
    const renderCampus = () => {
      if (!campus) {
        return (<span>None</span>)
      } else {
        return (<NavLink to={`/campuses/${campus.id}`}>{campus.name}</NavLink>)
      }
    };


    return (
      <div>
        <h4>Student Profile</h4>
        <ul>
          <li>Name: {studentCopy.name}</li>
          <li>Email: {studentCopy.email}</li>
          <li>Campus: {renderCampus()}</li>
        </ul>
        <br />
        <br />
        <div className="signin-container">
          <div className="buffer local">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Update name</label>
                <input
                  name="name"
                  type="name"
                  className="form-control"
                  placeholder="leave blank if none"
                  defaultValue=""
                />
              </div>
              <div className="form-group">
                <label>Update email</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="leave blank if none"
                  defaultValue=""
                />
              </div>
              <div className="form-group">
                <label>Update campus</label>
                <input
                  name="campus"
                  className="form-control"
                  placeholder="leave blank if none"
                  defaultValue=""
                />
              </div>
              <button type="submit" className="btn btn-block btn-primary">Update information</button>
            </form>
            <form onSubmit={this.handleDelete}>
              <button style={{ marginTop: .5 + 'em', backgroundColor: '#ff4c4c', border: 'red' }} type="submit" className="btn btn-block btn-primary">Delete Student</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  handleSubmit(event) {
    const { student } = this.props;
    const { campuses } = this.props;
    const campusCopy = Object.assign({}, campuses);
    event.preventDefault();
    if (!event.target.name.value) {
      var name = student.name
    } else {
      var name = event.target.name.value
    };
    if (!event.target.email.value) {
      var email = student.email
    } else {
      var email = event.target.email.value
    };
    if (!event.target.campus.value) {
      var campusId = student.campusId
    } else {
      var campus = _.find(campusCopy, campus => campus.name === event.target.campus.value);
      var campusId = campus.id
    };
    const studentUpdate = {
      name: name,
      email: email,
      campusId: campusId
    };
    this.props.updateStudents(student.id, studentUpdate, this.props.history);
    event.target.email.value = "";
    event.target.name.value = "";
    event.target.campus.value = "";
  }

  handleDelete(event) {
    const { student } = this.props;
    event.preventDefault();
    this.props.removeStudents(student.id, this.props.history);
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ students, campuses }, ownProps) => {
  const paramId = Number(ownProps.match.params.studentId);
  return {
    student: _.find(students, student => student.id === paramId),
    campuses: campuses
  };
};


const mapDispatch = { updateStudents, removeStudents };

export default withRouter(connect(mapState, mapDispatch)(UpdateStudent));




