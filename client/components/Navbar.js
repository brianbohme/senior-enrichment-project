import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li>
                <NavLink to="/students" activeClassName="active">All Students</NavLink>
              </li>
              <li>
                <NavLink to="/" activeClassName="active">Home</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

