import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="collapse navbar-collapse">
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-left">
                <li style={{ marginLeft: 5 + 'em' }}>
                  <NavLink to="/" activeClassName="active" className="navbarlink">Home</NavLink>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
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

