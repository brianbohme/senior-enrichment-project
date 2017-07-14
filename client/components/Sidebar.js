import React, { Component } from 'react';
import CampusList from './CampusList';
import { NavLink } from 'react-router-dom';


export default class Sidebar extends Component {

  render() {
    return (
      <sidebar>
        <div className="sidebar-header">
          <h4 href="#">
            <a href="/">
              <div className="mainhead" style={{ color: 'white' }}>Campus Manager</div>
            </a>
          </h4>
        </div>
        <NavLink to='/campuses'>
          <h5>Campuses</h5>
        </NavLink>
        <CampusList />
      </sidebar>
    );
  }
}
