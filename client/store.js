import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import socket from './socket';

// INITIAL STATE

const initialState = {
  campuses: [],
  newCampusEntry: "",
  students: [],
  newStudentEntry: ""
};

// ACTION TYPES

const GET_STUDENT = 'GET_STUDENT';
const GET_STUDENTS = 'GET_STUDENTS';
const WRITE_STUDENT = 'WRITE_STUDENT';
const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_CAMPUS = 'GET_CAMPUS';
const WRITE_CAMPUS = 'WRITE_CAMPUS';

// ACTION CREATORS

export function getStudent(student) {
  const action = { type: GET_STUDENT, student };
  return action;
}

export function getStudents(students) {
  const action = { type: GET_STUDENTS, students };
  return action;
}

export function writeStudent(content) {
  const action = { type: WRITE_STUDENT, content };
  return action;
}

export function getCampuses(campuses) {
  const action = { type: GET_CAMPUSES, campuses };
  return action;
}

export function getCampus(campus) {
  const action = { type: GET_CAMPUS, campus };
  return action;
}

export function writeCampus(content) {
  const action = { type: WRITE_CAMPUS, content };
  return action;
}


// THUNK CREATORS

export function fetchStudents() {

  return function thunk(dispatch) {
    return axios.get('/api/students')
      .then(res => res.data)
      .then(students => {
        const action = getStudents(students);
        dispatch(action);
      });
  }
}

export function fetchCampuses() {

  return function thunk(dispatch) {
    return axios.get('/api/campuses')
      .then(res => res.data)
      .then(campuses => {
        const action = getCampuses(campuses);
        dispatch(action);
      });
  }
}

export function postStudent(student, history) {

  return function thunk(dispatch) {
    return axios.post('/api/students', student)
      .then(res => res.data)
      .then(newStudent => {
        const action = getStudent(newStudent);
        dispatch(action);
        socket.emit('new-student', newStudent)
      })
  }
}

export function postCampus(campus, history) {

  return function thunk(dispatch) {
    return axios.post('/api/campuses', campus)
      .then(res => res.data)
      .then(newCampus => {
        const action = getCampus(newCampus);
        dispatch(action);
        socket.emit('new-campus', newCampus);
        history.push(`/campuses/${newCampus.id}`)
      })
  }
}

// REDUCER

function reducer(state = initialState, action) {

  switch (action.type) {

    case GET_CAMPUSES:
      return {
        ...state,
        campuses: action.campuses
      };

    case GET_CAMPUS:
      return {
        ...state,
        campuses: [...state.campuses, action.campus]
      };

    case WRITE_CAMPUS:
      return {
        ...state,
        newCampusEntry: action.content
      };

    case GET_STUDENTS:
      return {
        ...state,
        students: action.students
      }

    case GET_STUDENT:
      return {
        ...state,
        students: [...state.students, action.student]
      }

    case WRITE_STUDENT:
      return {
        ...state,
        newStudentEntry: action.content
      }

    default:
      return state;
  }

}

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, createLogger())
);

export default store;
