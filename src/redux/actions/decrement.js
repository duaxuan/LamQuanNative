import {decrement as decrementAction} from '../reducers/counterReducer';
import store from '../store';

const {dispatch} = store;

export function decrement(data) {
  dispatch(decrementAction(data));
}
