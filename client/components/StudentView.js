// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { writeStudent, updateStudents } from '../store';

// function StudentView(props) {
//   return (
//     <form onSubmit={props.handleSubmit}>
//       <div className="form-group">
//         <label htmlFor="name">Edit Student Info: </label>
//         <input className="form-control" type="text" name="studentName" placeholder="Update Name (leave blank if no update)" value={props.newStudentEntry.name} onChange={props.handleChange} />
//         <input className="form-control" type="text" name="studentEmail" placeholder="Updated Email (leave blank if no update)" value={props.newStudentEntry.email} onChange={props.handleChange} />
//         <input className="form-control" type="text" name="studentCampus" placeholder="Updated Campus (leave blank if no update)" value={props.newStudentEntry.campus} onChange={props.handleChange} />
//       </div>
//       <div className="form-group">
//         <button type="submit" className="btn btn-default">Update</button>
//       </div>
//     </form>
//   );
// }

// /** Write your `connect` component below! **/
// const mapStateToProps = (state, ownProps) => ({
//   newStudentEntry: state.newStudentEntry
// });

// const mapDispatchToProps = (dispatch, ownProps) => ({
//   handleChange: (event) => dispatch(writeStudent(event.target.value)),
//   handleSubmit: (event) => {
//     event.preventDefault();
//     const name = event.target.studentName.value;
//     dispatch(updateStudent({ name }))
//   }
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(StudentView)

// export default Container;



import React from 'react';
import { connect } from 'react-redux';
import { updateStudents, removeStudents } from '../store';
import _ from 'lodash';

/* -----------------    COMPONENT     ------------------ */

class UpdateStudent extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  render() {
    const { student } = this.props;

    return (
      <div>
        <h4>Student Profile</h4>
        <ul>
          <li>Name: {student.name}</li>
          <li>Email: {student.email}</li>
          <li>Campus: {student.campusId}</li>
        </ul>
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
              <button type="submit" className="btn btn-block btn-primary">Delete Student</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  handleSubmit(event) {
    const { student } = this.props;
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
      var campusId = event.target.campus.value
    };
    const studentUpdate = {
      name: name,
      email: email,
      campusId: campusId
    };
    this.props.updateStudents(student.id, studentUpdate, this.props.history);
    event.target.email.value = "";
    event.target.name.value = "";
  }

  handleDelete(event) {
    const { student } = this.props;
    event.preventDefault();
    this.props.removeStudents(student.id, this.props.history);
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ students }, ownProps) => {
  const paramId = Number(ownProps.match.params.studentId);
  return {
    student: _.find(students, student => student.id === paramId)
  };
};


const mapDispatch = { updateStudents, removeStudents };

export default connect(mapState, mapDispatch)(UpdateStudent);
