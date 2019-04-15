import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Item.scss'
import { Link } from 'react-router-dom';

export default class Item extends Component {
    state= {
        item: {},
    }
    componentDidMount() {
        axios.get(`http://localhost:8080/inventory/${this.props.match.params.id}`)
        .then(response => {
            this.setState({
                item: response.data
            })
        })
    }
  render() {
      let item = this.state.item
      const inStockClass = this.state.item.isInstock ? 'invItemContainer__inStockGreen' : 'invItemContainer__inStockGray'
    return (
      <div className='invItemContainer'>
        <div className='invItemContainer__outertitle'>
            <Link to={'/inventory'} style={{ textDecoration: 'none', color: 'black'}}>
                <img src='/Assets/Icon/SVG/Icon-back-arrow.svg' alt='back-arrow'/>
            </Link>
            <h1 className='invItemContainer__name'>{item.name}</h1>
            <div className={inStockClass}>
                {item.isInstock ? 'In Stock' : 'Sold Out'}
            </div>
        </div>
        <div id='desktopContainer'>
            <div id='description'>
                <h4 className='invItemContainer__label'>ITEM DESCRIPTION</h4>
                <p className='invItemContainer__text'>{item.description}</p>
            </div>
            <div id='orderinfo'>
                <div className='invItemContainer__outer'>
                    <div className='invItemContainer__outer--inner'>
                        <h4 className='invItemContainer__label'>ORDERED BY</h4>
                        <p className='invItemContainer__text'>Mark Saunders</p>
                    </div>
                    <div className='invItemContainer__outer--inner'>
                        <h4 className='invItemContainer__label'>REFERENCE NUMBER</h4>
                        <p className='invItemContainer__text'>{item.id}</p>
                    </div>
                </div>
                <div className='invItemContainer__outer'>
                    <div className='invItemContainer__outer--inner'>
                        <h4 className='invItemContainer__label'>LAST ORDERED</h4>
                        <p className='invItemContainer__text'>{item.lastOrdered}</p>
                    </div>
                    <div className='invItemContainer__outer--inner'>
                        <h4 className='invItemContainer__label'>LOCATION</h4>
                        <p className='invItemContainer__text'>{item.location}</p>
                    </div>
                </div>
                <h4 className='invItemContainer__label'>QUANTITY</h4>
                <p className='invItemContainer__text'>{item.quantity}</p>
                <h4 className='invItemContainer__label'>CATEGORIES</h4>
                <p className='invItemContainer__text'>{item.categories}</p>
            </div>
        </div>
        <div className='invItemContainer__btnContainer'>
            <button className='invItemContainer__btnContainer--button'>EDIT</button>
        </div>
    </div>
    )
  }
}
