import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Campus(props) {

  const campus = props.campus;

  return (
    <div style={{ marginLeft: 39.5 + '%' }}>
      <a href={`/campuses/${campus.id}`}>
        <div className="card-container">
          <div className="card">
            <div className="side"><img width="250" height="250" src={campus.image} /></div>
            <div className="side back">
              <h4 style={{ marginTop: 5 + 'em' }}>{campus.name}</h4>
            </div>
          </div>
        </div>
      </a>
      <br />
    </div>
  )
};




/* <div>
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
    </div> */

