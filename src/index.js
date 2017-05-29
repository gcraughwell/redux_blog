import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';//react router4
import promise from 'redux-promise';

//local components
import reducers from './reducers';
import PostIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostsShow from './components/posts_show';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>

{/* //react router4 react-router-dom uses BrowserRouter vs Router paths need to be set up in hirachy exact can be used  and also switch statements 

  */}
    <BrowserRouter>
<div>
    <Switch>
     <Route exact path="/posts/new" component={PostsNew}/>
     <Route path="/posts/:id" component={PostsShow}/>
     <Route path="/" component={PostIndex}/>
     </Switch>
</div>
   </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
