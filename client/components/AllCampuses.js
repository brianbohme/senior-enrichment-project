import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Campus from './campus';

const AllCampuses = props => (
  <div className="home">
    <div className="banner text-center text-inverted">
      <h1>Campuses</h1>
    </div>
    <br />
    <div className="media-heading large-font text-center">
      <ul className="list-unstyled">
        {
          props.campuses.map(campus => <Campus campus={campus} key={campus.id} />)
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


