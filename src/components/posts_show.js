import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router-dom';

class PostsShow extends Component {

  componentDidMount(){
    if (!this.props.post){
        const { id } = this.props.match.params; //given to us from react-router match is the top level prop params holds the data
    this.props.fetchPost(id);
        }
  }

onDeleteClick() {
  const { id } = this.props.match.params;

  this.props.deletePost(id, () =>{
    this.props.history.push('/');
  });
}


render() {
  const { post } = this.props;

  if(!post) {
      return <div>...loading</div>;
    }

  return (
    <div>
      <Link to="/"> Take Me Home </Link>
      <button className="btn btn-danger pull-xs-right"
        onClick={this.onDeleteClick.bind(this)}
        >
      Delete Post
      </button>
    <h3> Title: { post.title }</h3>
    <h6>Categories: { post.categories } </h6>
    <p> Content: { post.content }</p>

    </div>
  );
}
}

//ownProps is passed to posts show this.props === ownProps
function mapStateToProps({ posts }, ownProps) {
return { post: posts[ownProps.match.params.id]};

}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
