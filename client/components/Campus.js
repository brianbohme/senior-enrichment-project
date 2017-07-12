import React from 'react';

export default function Campus(props) {

  const campus = props.campus;

  return (
    <li className="media">
      <div className="media-left">
        <a href="#">
          <img className="media-object" src={campus.image} alt="image" />
        </a>
      </div>
      <div className="media-body">
        <h5 className="media-heading">{campus.name}</h5>
      </div>
    </li>
  );
}
