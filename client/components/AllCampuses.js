import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';

const AllCampuses = props => (
  <div className="home">
    <div className="banner text-center text-inverted">
      <h1>Campuses</h1>
    </div>
    <br />
    <div className="media-heading large-font text-center">
      <ul className="list-unstyled">
        {
          props.campuses.map(campus => {
            return (
              <div key={campus.id}>
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
          })
        }
      </ul>
    </div>
  </div>
);

const mapStateToProps = state => ({
  campuses: state.campuses
});


const Container = withRouter(connect(
  mapStateToProps
)(AllCampuses))

export default Container;


