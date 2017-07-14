import React, { Component } from 'react';
import Student from './Student';
import NewStudentEntry from './NewStudentEntry';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { updateStudents, writeStudentUpdate, updateCampuses, removeCampuses } from '../store';

class StudentList extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { newStudentUpdate } = this.props;
    const studentUpdate = {
      name: newStudentUpdate.name,
      email: newStudentUpdate.email,
      campusId: newStudentUpdate.campus
    };
    this.props.updateStudents(newStudentUpdate.id, studentUpdate, this.props.history);
  }

  handleChange(event) {
    const input = event.target.value;
    const inputId = parseInt(input.substring(input.length - 2));
    const campusId = Number(this.props.match.params.campusId);
    const { students, campus } = this.props;
    const filteredStudent = _.find(students, student => student.id === inputId)
    this.props.writeStudentUpdate({ name: filteredStudent.name, email: filteredStudent.email, campus: campusId, id: inputId })
  }

  handleUpdate(event) {
    const { campus } = this.props;
    event.preventDefault();
    if (!event.target.name.value) {
      var name = campus.name
    } else {
      var name = event.target.name.value
    };
    if (!event.target.image.value) {
      var image = campus.image
    } else {
      var image = event.target.image.value
    };
    const campusUpdate = {
      name: name,
      image: image
    };
    this.props.updateCampuses(campus.id, campusUpdate);
    event.target.name.value = "";
    event.target.image.value = "";
  }

  handleDelete(event) {
    const { campus } = this.props;
    event.preventDefault();
    this.props.removeCampuses(campus.id, this.props.history);
  }

  render() {

    const campusId = Number(this.props.match.params.campusId);
    const { students, campus } = this.props;
    const filteredStudents = students.filter(student => student.campusId === campusId);
    const campusCopy = Object.assign({}, campus)
    const allOtherStudents = students.filter(student => student.campusId !== campusId);

    return (
      <div>
        <div>
          <h2 className="title">{campusCopy.name}</h2>
          <br />
          <div className="photoCard">
            <img width="200" height="200" src={campusCopy.image} />
          </div>
          <br />
          <h4>Update Campus Info</h4>
          <div className="signin-container">
            <div className="buffer local">
              <form onSubmit={this.handleUpdate}>
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
                  <label>Update image URL</label>
                  <input
                    name="image"
                    className="form-control"
                    placeholder="leave blank if none"
                    defaultValue=""
                  />
                </div>
                <button style={{ marginBottom: .5 + 'em' }} type="submit" className="btn btn-block btn-primary">Update information</button>
              </form>
              <form onSubmit={this.handleDelete}>
                <button type="submit" className="btn btn-block btn-primary" style={{ backgroundColor: '#ff4c4c', border: 'red' }}>Delete Campus</button>
              </form>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div>
          <div className="bordered">
            <h3 style={{ marginLeft: .5 + 'em' }}>Enrolled Students</h3>
            <br />
            <ul className="media-list" style={{ marginLeft: 1 + 'em' }}>
              {filteredStudents.map(student => <Student student={student} key={student.id} id={student.id} />)}
            </ul>
          </div>
          <br />
          <h4>Enroll a New Student</h4>
          <NewStudentEntry campusId={campusId} />
          <br />
          <h4>Add an Existing Student</h4>
          <form onSubmit={this.handleSubmit}>
            <select style={{ marginBottom: .5 + 'em' }} onChange={this.handleChange}>
              <option selected disabled>Choose student...</option>
              {
                allOtherStudents.map(student => <option key={student.id}>Name: {student.name}, Email: {student.email}, Student ID: {student.id}</option>)
              }
            </select>
            <input style={{ marginBottom: 5 + 'em' }} type="submit" className="btn btn-block btn-primary" value="Add to Campus" />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ students, campuses, newStudentUpdate }, ownProps) => {
  const paramId = Number(ownProps.match.params.campusId);
  return {
    campus: _.find(campuses, campus => campus.id === paramId),
    students: students,
    newStudentUpdate: newStudentUpdate
  };
};

const mapDispatch = { updateStudents, writeStudentUpdate, updateCampuses, removeCampuses };

export default withRouter(connect(
  mapStateToProps, mapDispatch
)(StudentList));
