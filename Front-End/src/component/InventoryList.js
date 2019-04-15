import React, { Component } from 'react';
import InventoryItem from './InventoryItem';
import axios from 'axios';
import '../styles/InventoryList.scss'
import CreateNewInv from './CreateNewInv';

export default class InventoryList extends Component {

        state = {
            inventory: [],
            display: false,
            checked: false
        }
        popUpHandler = () => {
            this.setState({
                display: true
            });
        }
        hidePopUpHandler = () => {
            this.setState({
                display: !this.state.display
            });
        }
        fetchInventoryData = ()=> {
            axios.get(`http://localhost:8080/inventory`)
            .then(response => {
                console.log(response)
                this.setState({
                 inventory: response.data
            });
            })
        }
        componentDidMount() {
           this.fetchInventoryData();
           
        }

        remove_item = (id)=>{
            axios.delete(`http://localhost:8080/inventory/${id}`)
            .then(res=>{
            this.setState({
                inventory:res.data
            })
        })
        }
         
        
  render() {
      const inventory = this.state.inventory;
      const inventoryList = inventory
        .map(item => (
            <InventoryItem
                name={item.name}
                description={item.description}
                lastOrdered={item.lastOrdered}
                location={item.location}
                quantity={item.quantity}
                isInstock={item.isInstock}
                id={item.id}
                key={item.id}
                remove_item={this.remove_item}
                />
        ))
        return (
        <div className='invContainer'>
            <div className='invContainer__titlesearch'>
                <h1 className='invContainer__titlesearch--title'>Inventory</h1>
                <input className='invContainer__titlesearch--search' type='search' placeholder='Search'></input>
            </div>
            <div className='invContainer__headers'>
                <h4 className='invContainer__headers--itemheader'>ITEM</h4>
                <h4 className='invContainer__headers--header'>LAST ORDERED</h4>
                <h4 className='invContainer__headers--header'>LOCATION</h4>
                <h4 className='invContainer__headers--header'>QUANTITY</h4>
                <h4 className='invContainer__headers--statusheader'>STATUS</h4>
            </div>
            <div className='invContainer__items'>
                {inventoryList}
            </div>
            <button className='invContainer__addButton' onClick={this.popUpHandler}>
                <img src='Assets/Icon/SVG/Icon-add.svg' alt='add-button'/>
            </button>
            {this.state.display ? 
            <CreateNewInv show={this.state.display}
                          hide={this.hidePopUpHandler} 
                          fetchInv={this.fetchInventoryData}
                          /> : null
            }
        </div>
        )
    }
}
