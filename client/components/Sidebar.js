import React, { Component } from 'react';
import CampusList from './CampusList';

export default class Sidebar extends Component {

  render() {
    return (
      <sidebar>
        <div className="sidebar-header">
          <h4 href="#">
            <div>Campus Manager</div>
          </h4>
        </div>
        <h5>Campuses</h5>
        <CampusList />
      </sidebar>
    );
  }
}
