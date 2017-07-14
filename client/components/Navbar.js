import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="collapse navbar-collapse">
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <NavLink to="/" activeClassName="active">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/students" activeClassName="active">All Students</NavLink>
                </li>
                <li>
                  <NavLink to="/campuses" activeClassName="active">All Campuses</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

