import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

//
export default function(state = {}, action) {
    switch(action.type) {
      case DELETE_POST:
return _.omit(state, action.payload); //look at the state object if the state object has a key of post id drop it and omit a new state object minus that post.id

    case FETCH_POST:
    return {...state, [action.payload.data.id]: action.payload.data };


    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, 'id');
    default:
    return state;
  }
}



//FETCH_POST...state adds to the applications state all the posts we have already fetched and put them into this new object.
  // const post = action.payload.data;
  // const newState = { ...state };
  // newState[post.id] = post;
  // return newState;


// this is the same as approve [] is not creating a array is ket interpulation whatever action.payload.data.id make a new key on this object and set its value to action.payload.data
