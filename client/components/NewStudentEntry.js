import React, { Component } from 'react';
import store, { postStudent, writeStudent } from '../store';

export default class NewStudentEntry extends Component {

  constructor() {
    super();
    this.state = store.getState();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleChange(evt) {
    store.dispatch(writeStudent(evt.target.value))
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const { newStudentEntry } = this.state;
    const name = newStudentEntry;
    const { campusId } = this.props;

    store.dispatch(postStudent({ name, campusId }));
    store.dispatch(writeStudent(''));
  }

  render() {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={this.state.newStudentEntry}
            onChange={this.handleChange}
            placeholder="Enter New Student's Name"
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Add to Campus</button>
          </span>
        </div>
      </form>
    );
  }
}
