import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeChannel, postChannel } from '../store';

function NewChannelEntry(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Create a Channel</label>
        <input className="form-control" type="text" name="channelName" placeholder="Enter channel name" value={props.newChannelEntry} onChange={props.handleChange} />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-default">Create Channel</button>
      </div>
    </form>
  );
}

/** Write your `connect` component below! **/
const mapStateToProps = (state, ownProps) => ({
  newChannelEntry: state.newChannelEntry
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleChange: (event) => dispatch(writeChannel(event.target.value)),
  handleSubmit: (event) => {
    event.preventDefault();
    const name = event.target.channelName.value;
    dispatch(postChannel({ name }, ownProps.history));
    dispatch(writeChannel(''))
  }
});

const Container = connect(mapStateToProps, mapDispatchToProps)(NewChannelEntry)

export default Container;
