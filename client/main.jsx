import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import { mount } from 'react-mounter';
import { render } from 'react-dom';
import { Form } from '../imports/ui/Form.jsx';
import { List } from '../imports/ui/List.jsx';
import { Products } from '../imports/api/products';
import App from '../imports/ui/App.jsx';

FlowRouter.route('/', {
  name: 'products',
  action(params) {
    mount(App, {
      main: (props) => <List {...props} />,
    });
  },
});

FlowRouter.route('/add', {
  name: 'products.add',
  action(params) {
    mount(App, {
      main: (props) => <Form {...props} />,
    });
  },
});

FlowRouter.route('/:_id', {
  name: 'products.detail',
  action(params) {
    const item = Products.findOne({ _id: params._id });
    if (item === null) {
      FlowRouter.go('/');
    }
    mount(App, {
      main: (props) => {
        const item = Products.findOne({ _id: params._id });
        return <Form item={item} />;
      }
    });
  },
});
