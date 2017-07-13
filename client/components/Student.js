import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Student(props) {

  const student = props.student;
  const id = props.id;

  return (
    <li className="media">
      <div className="media-body">
        <NavLink to={`/students/${id}`}>
          <h4 className="media-heading">{student.name}</h4>
        </NavLink>
        <h6>{student.email}</h6>
      </div>
    </li>
  );
}
