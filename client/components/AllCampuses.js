import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Campus from './campus';


/* This component renders a list of all campuses using the Campus module */

/* -----------------    COMPONENT     ------------------ */

const AllCampuses = props => (
  <div className="home">
    <div className="banner text-center text-inverted">
      <h1>Campuses</h1>
    </div>
    <br />
    <div className="media-heading large-font text-center">

      {
        props.campuses.map(campus => <Campus campus={campus} key={campus.id} />)
      }

    </div>
  </div>
);

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = state => ({
  campuses: state.campuses
});


const Container = withRouter(connect(
  mapStateToProps
)(AllCampuses))

export default Container;


