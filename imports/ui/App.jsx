import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Products } from '../api/products.js';

// App component - represents the whole app
export const App = (props) => (
  <div className="container">
    {props.main(props)}
  </div>
);

export default createContainer(() => {
  return {
    items: Products.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);
