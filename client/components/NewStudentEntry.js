import React, { Component } from 'react';
import store, { postStudent, writeStudent } from '../store';

/* Component to register a new student. Is not using react-redux because complicated state handling */

/* -----------------    COMPONENT     ------------------ */

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
      <div className="signin-container">
        <div className="buffer local">
          <form id="new-message-form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                className="form-control"
                type="text"
                name="content"
                value={this.state.newStudentEntry.name}
                onChange={this.handleNameChange}
                placeholder="Enter New Student's Name"
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                type="text"
                name="content"
                value={this.state.newStudentEntry.email}
                onChange={this.handleEmailChange}
                placeholder="Enter New Student's Email"
                required
              />
              <button style={{ marginTop: .5 + 'em' }} className="btn btn-block btn-primary" type="submit">Add to Campus</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}







