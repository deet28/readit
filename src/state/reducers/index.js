import { combineReducers } from 'redux';
import sortReducer from './sortReducer';
import selectReducer from './selectReducer';

const reducers = combineReducers ({
  sort:sortReducer,
  select:selectReducer,
})

export default reducers; 