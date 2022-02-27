import { combineReducers } from 'redux';
import sortReducer from './sortReducer';

const reducers = combineReducers ({
  sort:sortReducer
})

export default reducers; 