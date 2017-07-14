import React from 'react';
import { NavLink } from 'react-router-dom';

/* Basic student view */

/* -----------------    COMPONENT     ------------------ */

export default function Student(props) {

  const student = props.student;

  return (
    <li className="media">
      <div className="media-body">
        <NavLink to={`/students/${student.id}`}>
          <h4 className="media-heading">{student.name}</h4>
        </NavLink>
        <h6>{student.email}</h6>
      </div>
    </li>
  );
}
