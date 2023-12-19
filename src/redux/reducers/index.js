import {combineReducers} from '@reduxjs/toolkit';
import counterReducer from './counterReducer';

const appReducer = combineReducers({
  counterReducer,
});

export default appReducer;
