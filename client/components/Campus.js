import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Campus(props) {

  const campus = props.campus;

  return (
    <div>
      <li>
        <img width="250" height="250" src={campus.image} />
      </li>
      <br />
      <li>
        <NavLink to={`/campuses/${campus.id}`}>
          <h4>{campus.name}</h4>
        </NavLink>
      </li>
      <br />
      <br />
    </div>
  )
};
