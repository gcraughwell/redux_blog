import React, {Component } from 'react';
import PropTypes from 'prop-types';
//reduxForm is a function similar to react redux
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createPost } from '../actions';

class PostsNew extends Component {

//RENDERED TO THE SCREEN
renderField(field) { //field has some event handler on it we need to wire up

const { meta: { touched, error } } = field; //so you can remove the field from field.meta. ...
const className = `form-group ? ${touched && error ? 'has-danger': ''}`;

  return (
    <div className={className}>
  <label> { field.label } </label>
      <input className="form-control" type="text"
        {...field.input}
      />
      {/* ternary expression evaluates everything before the ? before call after ?  */}
      <div className="text-help">
      {touched ? error: ''}
      </div>
    </div>
  );
}

//onsubmit object is values from the reduxform below
onSubmit(values){
this.props.createPost(values, () => {
  this.props.history.push('/') //.then statement moves to a callback on the action 
});
}


  render() {
    const { handleSubmit } = this.props; //

        return (
<form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>



  {/* //the field is a distinct field that will be visable to our users.
  //specfiy the name so it knows what piece of state it is going to produce */}
  <Field
    label="Title" //label is what is pasted to the ui
    name="title" //name connects to the validate function below so field.meta.error can recieve the error message above.
    component={ this.renderField } //component is defined above as this renderField
  />
  <Field label="Categories"  name="categories" component={ this.renderField} />
  <Field label="Post Content" name="content" component={ this.renderField } />
<button type="submit" className="btn btn-primary hvr-grow"> Submit </button>
<Link to="/" className="btn btn-danger hvr-grow"> Home </Link>

</form>
    );
  }
}

//validate function is given a single argument (values) - values holds all the data entered into the form
//validate is automatically called by redux form validate is pasted to redux form below in export default
function validate(values){

const errors = {};//empty object


//if not valid i.e. no title
if(!values.title) {
  errors.title = "Enter a title!";
}
if(!values.categories) {
  errors.categories = "🙇🏼 You for got to enter some categories!";
}
if(!values.content) {
  errors.content = "🤦🏻‍ You forgot to post any content";
}


//validate the inputs from "values"
//if errors is empty, the form is fine to submit
//if errors has any properties(props) redux form assumes is invalid
return errors;
}

export default reduxForm({
  validate, //if the key and the value are the same you can use validate, by its self.
form: 'PostsNewForm' //form is the name of the form PostNew can be whatever you want must be unique
 })(
   connect (null,{ createPost })(PostsNew)
 );
