import React, { Component } from 'react';
import '../styles/InventoryList.scss';
import { Link } from 'react-router-dom';


export default class InventoryItem extends Component {
  state={
    remove:false
  }

  remove_kebab=()=>{
    this.setState({
      remove:!this.state.remove
    })
  }

  remove_elsewhere =()=>{
    if(this.state.remove){
      this.setState({
        remove: !this.state.remove
      })
    }
  }
  render() {
    return (
        
        <div className='itemContainer' onClick={this.remove_elsewhere}>
            <Link to={`/inventory/${this.props.id}`}  style={{ textDecoration: 'none', color: 'black'}} >
                <div className='itemContainer__namedesc'>
                    <h4 className='itemContainer__label'>ITEM</h4>
                    <h2 className='itemContainer__namedesc--name'>{this.props.name}</h2>
                    <p className='itemContainer__namedesc--desc'>{this.props.description}</p>
                </div>
            </Link>
            <h4 className='itemContainer__label'>LAST ORDERED</h4>
            <p className='itemContainer__detail'>{this.props.lastOrdered}</p>
            <h4 className='itemContainer__label'>LOCATION</h4>
            <p className='itemContainer__detail'>{this.props.location}</p>
            <h4 className='itemContainer__label'>QUANTITY</h4>
            <p className='itemContainer__detail'>{this.props.quantity}</p>
            <h4 className='itemContainer__label'>STATUS</h4>
            <p className='itemContainer__statusdetail'>
                {this.props.isInstock ? 'In Stock' : 'Sold Out'}</p>
            <div onClick ={this.remove_kebab} className='itemContainer__kebab'>
                {this.state.remove? <img src="../Assets/Icon/SVG/Icon-kebab-click.svg" alt="kebab-icon"/>:<img src="../Assets/Icon/SVG/Icon-kebab-default.svg" alt="kebab-icon"/>}
            </div>
            {this.state.remove ? <button className='itemContainer__button'  onClick={()=>{this.props.remove_item(this.props.id)}}>Remove</button> : null}
        </div>
    )
  }
}
