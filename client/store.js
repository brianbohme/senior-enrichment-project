import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import socket from './socket';
import { CampusList } from './components/CampusList';

// INITIAL STATE

const initialState = {
  campuses: [],
  newCampusEntry: '',
  students: [],
  newStudentEntry: { name: '', email: '', campus: 0 },
  newStudentUpdate: { name: '', email: '', campus: 0, id: 0 }
};

// ACTION TYPES

/* Student */

const GET_STUDENT = 'GET_STUDENT';
const GET_STUDENTS = 'GET_STUDENTS';
const WRITE_STUDENT = 'WRITE_STUDENT';
const REMOVE_STUDENT = 'REMOVE_STUDENT';
const WRITE_STUDENT_UPDATE = 'WRITE_STUDENT_UPDATE';
const UPDATE_STUDENT = 'UPDATE_STUDENT';

/* Campus */

const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_CAMPUS = 'GET_CAMPUS';
const WRITE_CAMPUS = 'WRITE_CAMPUS';
const REMOVE_CAMPUS = 'REMOVE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

// ACTION CREATORS

/* Student */

export const getStudent = student => ({ type: GET_STUDENT, student });

export const getStudents = students => ({ type: GET_STUDENTS, students });

export const writeStudent = content => ({ type: WRITE_STUDENT, content });

export const removeStudent = id => ({ type: REMOVE_STUDENT, id });

export const writeStudentUpdate = content => ({ type: WRITE_STUDENT_UPDATE, content });

export const updateStudent = student => ({ type: UPDATE_STUDENT, student });

/* Campus */

export const getCampuses = campuses => ({ type: GET_CAMPUSES, campuses });

export const getCampus = campus => ({ type: GET_CAMPUS, campus });

export const writeCampus = content => ({ type: WRITE_CAMPUS, content });

export const removeCampus = id => ({ type: REMOVE_CAMPUS, id });

export const updateCampus = campus => ({ type: UPDATE_CAMPUS, campus });


// THUNK CREATORS

/* Student */

export const fetchStudents = () => dispatch => {
  axios.get('/api/students')
    .then(res => res.data)
    .then(students => {
      const action = getStudents(students);
      dispatch(action);
    });
};

export const postStudent = (student, history) => dispatch => {
  axios.post('/api/students', student)
    .then(res => res.data)
    .then(newStudent => {
      const action = getStudent(newStudent);
      dispatch(action);
      socket.emit('new-student', newStudent)
    })
};

export const updateStudents = (id, student, history) => dispatch => {
  axios.put(`/api/students/${id}`, student)
    .then(res => {
      dispatch(updateStudent(res.data));
      socket.emit('student-update', res.data);
      history.push(`/students/${id}`);
    })
    .catch(err => console.error(`Student update unsuccessful!`, err));
};

export const removeStudents = (id, history) => dispatch => {
  dispatch(removeStudent(id));
  axios.delete(`/api/students/${id}`)
    .then(res => {
      history.push(`/students`)
    })
    .catch(err => console.error(`Removing student unsuccessful!`, err));
};

/* Campus */

export const fetchCampuses = () => dispatch => {
  axios.get('/api/campuses')
    .then(res => res.data)
    .then(campuses => {
      const action = getCampuses(campuses);
      dispatch(action);
    });
};

export const postCampus = (campus, history) => dispatch => {
  axios.post('/api/campuses', campus)
    .then(res => res.data)
    .then(newCampus => {
      const action = getCampus(newCampus);
      dispatch(action);
      socket.emit('new-campus', newCampus);
      history.push(`/campuses/${newCampus.id}`)
    })
};

export const updateCampuses = (id, campus) => dispatch => {
  axios.put(`/api/campuses/${id}`, campus)
    .then(res => {
      dispatch(updateCampus(res.data));
      socket.emit('campus-update', res.data)
    })
    .catch(err => console.error(`Campus update unsuccessful!`, err));
};

export const removeCampuses = (id, history) => dispatch => {
  dispatch(removeCampus(id));
  axios.delete(`/api/campuses/${id}`)
    .then(res => {
      history.push(`/campuses`);
    })
    .catch(err => console.error(`Removing campus unsuccessful!`, err));
};



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

    case UPDATE_CAMPUS:
      return {
        ...state,
        campuses: state.campuses.map(campus => (
          action.campus.id === campus.id ? action.campus : campus
        ))
      }

    case REMOVE_CAMPUS:
      return {
        ...state,
        campuses: state.campuses.filter(campus => campus.id !== action.id)
      }

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

    case WRITE_STUDENT_UPDATE:
      return {
        ...state,
        newStudentUpdate: action.content
      }

    case UPDATE_STUDENT:
      return {
        ...state,
        students: state.students.map(student => (
          action.student.id === student.id ? action.student : student
        ))
      }

    case REMOVE_STUDENT:
      return {
        ...state,
        students: state.students.filter(student => student.id !== action.id)
      }

    default:
      return state;
  }

}

// Main Store Export

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, createLogger())
);

export default store;
