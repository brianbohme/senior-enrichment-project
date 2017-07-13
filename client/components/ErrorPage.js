import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default function ErrorPage(props) {
  return (
    <div className="home">
      <div className="banner text-center text-inverted">
        <h1>Oops, looks like you're lost!</h1>
        <h1><small>The page you're looking for does not exist</small></h1>
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="inverted">
        <div className="container">
          <div className="media large-font">
            <div className="media-body">
              <h3 className="media-heading large-font text-center">Go back to home:</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="media-heading large-font text-center">
        <ul className="list-unstyled">
          {
            <li>
              <NavLink to={'/'}>
                <h3>Let's Go!</h3>
              </NavLink>
            </li>
          }
        </ul>
      </div>
    </div>
  )
};


