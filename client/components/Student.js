import React from 'react';

export default function Student(props) {

  const student = props.student;

  return (
    <li className="media">
      <div className="media-body">
        <h4 className="media-heading">{student.name}</h4>
        <h6>{student.email}</h6>
      </div>
    </li>
  );
}
