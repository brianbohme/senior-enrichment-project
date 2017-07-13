import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store from '../store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

function CampusList(props) {
  const getCount = campusId => {
    let count = props.students.filter(student => {
      return student.campusId === campusId
    });

    return count.length
  };

  return (
    <ul>
      {
        props.campuses.map(campus => {
          return (
            <li key={campus.id}>
              <NavLink to={`/campuses/${campus.id}`} activeClassName="active">
                <span>{campus.name}</span>
                <span className="badge">{getCount(campus.id)}</span>
              </NavLink>
            </li>
          )
        })
      }
      <li>
        <NavLink to="/new-campus">Add a new campus...</NavLink>
      </li>
    </ul>
  );
}

//Connect Component
const mapStateToProps = state => ({
  campuses: state.campuses,
  students: state.students
})

const CampusListContainer = withRouter(connect(
  mapStateToProps
)(CampusList))

export default CampusListContainer;
