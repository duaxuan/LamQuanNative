import {increment as incrementAction} from '../reducers/counterReducer';
import store from '../store';

const {dispatch} = store;

export function increment(data) {
  dispatch(incrementAction(data));
}
