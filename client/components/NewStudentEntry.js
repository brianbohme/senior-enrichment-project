import React, { Component } from 'react';
import store, { postStudent, writeStudent } from '../store';

export default class NewStudentEntry extends Component {

  constructor() {
    super();
    this.state = store.getState();

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleNameChange(evt) {
    store.dispatch(writeStudent({ name: evt.target.value, email: this.state.newStudentEntry.email }))
  }

  handleEmailChange(evt) {
    store.dispatch(writeStudent({ name: this.state.newStudentEntry.name, email: evt.target.value }))
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const { newStudentEntry } = this.state;
    const name = newStudentEntry.name;
    const email = newStudentEntry.email;
    const { campusId } = this.props;

    store.dispatch(postStudent({ name, email, campusId }));
    store.dispatch(writeStudent({ name: '', email: '' }));
  }

  render() {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={this.state.newStudentEntry.name}
            onChange={this.handleNameChange}
            placeholder="Enter New Student's Name"
            required
          />
          <input
            className="form-control"
            type="text"
            name="content"
            value={this.state.newStudentEntry.email}
            onChange={this.handleEmailChange}
            placeholder="Enter New Student's Email"
            required
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Add to Campus</button>
          </span>
        </div>
      </form>
    );
  }
}

