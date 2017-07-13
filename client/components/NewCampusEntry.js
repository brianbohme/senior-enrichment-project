import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeCampus, postCampus } from '../store';

function NewCampusEntry(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Register a Campus</label>
        <input className="form-control" type="text" name="campusName" placeholder="Enter campus name" value={props.newCampusEntry} onChange={props.handleChange} />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-default">Register</button>
      </div>
    </form>
  );
}

//Connect Component

const mapStateToProps = (state, ownProps) => ({
  newCampusEntry: state.newCampusEntry
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleChange: (event) => dispatch(writeCampus(event.target.value)),
  handleSubmit: (event) => {
    event.preventDefault();
    const name = event.target.campusName.value;
    dispatch(postCampus({ name }, ownProps.history));
    dispatch(writeCampus(''))
  }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(NewCampusEntry)

export default Container;
