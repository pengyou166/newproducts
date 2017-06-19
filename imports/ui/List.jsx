import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Tasks } from '../api/tasks.js';
import Task from './Task.jsx';
import Item from './Item.jsx';

// App component - represents the whole app
export class List extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
  };

  render() {
    return (
      <div className="container">
        <header>
          <h1>Products</h1>
          <button className="add" onClick={() => FlowRouter.go('/add')}>+</button>
        </header>

        <ul>
          {
            this.props.items.map(x => (
              <Item key={x._id} item={x} />
            ))
          }
        </ul>
      </div>
    );
  }
}
