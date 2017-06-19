import React, { Component, PropTypes } from 'react';
import { Products } from '../api/products.js';

export class Form extends Component {
  static propTypes = {
    item: PropTypes.object,
  };

  domForm: Element;

  handleSubmit = (e) => {
    e.preventDefault();
    const { item } = this.props;
    const data = {};
    const now = new Date();
    $(this.domForm).serializeArray().forEach(x => {
      data[x.name] = x.value;
    })
    if (!item) {
      // Add
      const id = Products.insert({
        createdAt: now,
        modifiedAt: now,
    ...data,
    });
    FlowRouter.go(`/${id}`);
  } else {
  // Edit
  Products.update(item._id, {
    $set: { modifiedAt: new Date(), ...data },
});
alert('Updated!');
}
}

handleDelete = () => {
  Products.remove(this.props.item._id)
  FlowRouter.go('/');
}

render() {
  const { item = {} } = this.props;
  const isAdd = !item._id;
  return (
      <div className="container">
        <header>
          <h1>
            <a href="/">Product</a>&nbsp;/&nbsp;{ isAdd ? 'Add' : item.name }
          </h1>
        </header>

        <form className="edit" onSubmit={this.handleSubmit} ref={x => { this.domForm = x; }}>
          { !isAdd &&
          <div className="form-group">
            <label htmlFor="id">ID</label>
            <input className="form-control" id="id" disabled defaultValue={item._id} />
          </div>
              }
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input className="form-control" id="name" name="name" defaultValue={item.name} placeholder_="Name" required />
          </div>
          <div className="form-group">
            <label htmlFor="price">Unit Price *</label>
            <div className="input-group">
              <div className="input-group-addon">$</div>
              <input type="number" className="form-control" id="price" name="price" defaultValue={item.price} placeholder_="Unit Price" required />
              <div className="input-group-addon">.00</div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="name">Count *</label>
            <input type="number" className="form-control" id="count" name="count" defaultValue={item.count} placeholder_="Count" required />
          </div>
          <div className="form-group">
            <label htmlFor="name">Description</label>
            <textarea className="form-control" id="description" name="description" defaultValue={item.description} placeholder_="Description" />
          </div>

          { isAdd ?
              (
                  <button type="submit" className="btn btn-primary">Add</button>
              ) : (
              <div>
                <button type="submit" className="btn btn-primary">Update</button>
                <button type="button" className="btn btn-link" onClick={this.handleDelete}>Remove</button>
              </div>
          )
              }
        </form>
      </div>
  );
}
}
