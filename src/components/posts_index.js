import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
//componentDidMount is a lifecycle function called as soon as this comp shows in the dom
// fetching are api fetchPosts is  Async call react calls the component asap even if the api data has been not loaded
//as soon as the component is about to go on to the screen we want this component to go to the api and fetch this list of posts fetchPosts
//componentWillMount is called before the component loads into the browser.
  componentDidMount(){
 this.props.fetchPosts();
  }

//this is a object that does not have built in .map to map through the array of components so lodash map function can deal with objects.
renderPosts(){
return _.map(this.props.posts, post => {
return(
  <li className="list-group-item" key={post.id}>
    <Link to={"posts/" + post.id}>
            <span className="pull-xs-right">{post.categories}</span>
            <strong>{post.title}</strong>
          </Link>
  </li>
);
});
}

render() {
  return (
    <div>
      <div className="text-xs-right">
        <Link className="btn btn-primary hvr-grow" to="/posts/new" > Add New Post </Link>
      </div>
      <h3>Posts</h3>
      <ul className="list-group">
        {this.renderPosts()}

      </ul>
     </div>
  );
}
}

//application state needs mapStateToProps
function mapStateToProps(state) {
return { posts: state.posts};
}

// this is the same as mapStateToProps we still have access to this.props.fetchPosts
//passing in the action creator fetchposts into the component. connect is taking care of it for us.
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
