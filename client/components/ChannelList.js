import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store from '../store';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

function ChannelList(props) {
  const getCount = channelId => {
    let count = props.messages.filter(element => {
      return element.channelId === channelId
    });

    return count.length
  };

  return (
    <ul>
      {
        props.channels.map(channel => {
          return (
            <li key={channel.id}>
              <NavLink to={`/channels/${channel.id}`} activeClassName="active">
                <span>#{channel.name}</span>
                <span className="badge">{getCount(channel.id)}</span>
              </NavLink>
            </li>
          )
        })
      }
      <li>
        <NavLink to="/new-channel">Create a channel...</NavLink>
      </li>
    </ul>
  );
}

/** Write your `connect` component below! **/
const mapStateToProps = state => ({
  channels: state.channels,
  messages: state.messages
})



const ChannelListContainer = withRouter(connect(
  mapStateToProps
)(ChannelList))

export default ChannelListContainer;
