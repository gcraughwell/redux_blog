import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_post';
export const FETCH_POST = 'fetch_post';
export const DELETE_POST = 'delete_post';

//ROOT_URL and API for fetching the posts
const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=PaperSandwich345';

//action creator to fetch our posts
//axios request assign it to the var request and sign request to the payload property redux promise middleware will resolve this action for us.
export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

  return {
    type: FETCH_POSTS,
    payload: request
  };
}


export function createPost(values, callback){
const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
.then(() => callback ()); // .then whats for the promise to return before calling the callback to redirect us back to '/'
//values is the second argument that we want to send to this api

return {
  type: CREATE_POST,
  payload: request
};
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
  type: FETCH_POST,
  payload: request
};
}

export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
.then(() => callback ());

  return {
  type: DELETE_POST,
  payload: id
};
}
