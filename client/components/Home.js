import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

/* The home page! */

/* -----------------    COMPONENT     ------------------ */

const Home = props => (
  <div className="home">
    <div className="banner text-center text-inverted">
      <h1>Welcome to Campus Manager</h1>
      <img width='350' height='250' src='http://www.clipartlord.com/wp-content/uploads/2015/10/school-building5.png' />
      <h1><small>Manage campuses and enrolled students here</small></h1>
    </div>
    <br />
    <div className="inverted">
      <div className="container">
        <div className="media large-font">
          <div className="media-body">
            <h3 className="media-heading large-font text-center">Current Campuses</h3>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div className="media-heading large-font text-center">
      <ul className="list-unstyled">
        {
          props.campuses.map(campus => {
            return (
              <li key={campus.id}>
                <NavLink to={`/campuses/${campus.id}`}>
                  <span>{campus.name}</span>
                </NavLink>
              </li>
            )
          })
        }
      </ul>
    </div>
  </div>
);

/* -----------------    CONTAINER     ------------------ */


const mapStateToProps = state => ({
  campuses: state.campuses
});


const Container = withRouter(connect(
  mapStateToProps
)(Home))

export default Container;


