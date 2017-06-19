import React, { Component, PropTypes } from 'react';
import { Products } from '../api/products.js';

export default class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  handleDelete = () => Products.remove(this.props.item._id)

  render() {
    const { item } = this.props;
    return (
      <li>
        <button className="delete" onClick={this.handleDelete}>
          &times;
        </button>
        <table width="300" border="1" cellSpacing="">
          <tr>
            <td align="justify"><a href={`/${item._id}`} className="text">{item.name}</a> </td>
            <td align="justify"> {item.price}</td>
            <td align="justify"> {item.count}</td>
            <td align="justify"> {item.description}</td>
          </tr>
        </table>

      </li>
    );
  }
}
