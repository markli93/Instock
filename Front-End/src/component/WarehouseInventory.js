import React, { Component } from 'react';
import '../styles/warehouseInventory.scss';
import '../styles/InventoryList.scss';
import axios from 'axios';
import InventoryItem from './InventoryItem';
import {Link} from 'react-router-dom';

export default class WarehouseInventory extends Component {
    state = {
        warehouseInformation: {},
        warehouseInventory: [],
        loaded: false,
        loadedInventory: false
    }
    componentDidMount() {
        axios.get('http://localhost:8080/warehouses')
            .then(response => {
                this.warehouseInfo = response.data.filter(item => {
                    return item.id === this.props.match.params.warehouseId;
                });
                this.setState({
                    warehouseInformation: this.warehouseInfo[0],
                    loaded: true
                })
            })
            .catch(error => {
                console.log(error);
            });
        axios.get(`http://localhost:8080/warehouses/${this.props.match.params.warehouseId}`)
            .then(response => {
                this.setState({
                    warehouseInventory: response.data,
                    loadedInventory: true
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    remove_item = (id)=>{
        axios.delete(`http://localhost:8080/inventory/${id}`)
        .then(res=>{
        this.setState({
            warehouseInventory:res.data
        })
      }
    )}
     

    render() {
        if (this.state.loaded && this.state.loadedInventory) {
            const {name, address, contact} = this.state.warehouseInformation;
            const inventoryList = this.state.warehouseInventory.map(item => (
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
            ));
            return (
                <div className="warehouseInventory wrapper">
                    <div className="warehouseInventory__title">
                        <Link to='/warehouses'><img src="/assets/Icon/SVG/Icon-back-arrow.svg" alt="back arrow"/></Link>
                        <h1 className="warehouseInventory__title--title">{name}</h1>
                    </div>
                    <div className="warehouseInfo">
                        <div className="warehouseInfo__address">
                            <h2>ADDRESS</h2>
                            <p>{address.street}</p>
                            <p className="warehouseInfo__address--marginBottom">{address.suiteNum}</p>
                            <p>{`${address.city},${address.province}`}</p>
                            <p>{address.postal}</p>
                        </div>
                        <div className="warehouseInfo__contact">
                            <h2>CONTACT</h2>
                            <p>{contact.name}</p>
                            <p className="warehouseInfo__contact--marginBottom">{contact.title}</p>
                            <p>{contact.phone}</p>
                            <p>{contact.email}</p>
                        </div>
                    </div>
                    <div className='invContainer__headers'>
                        <h4 className='invContainer__headers--itemheader'>ITEM</h4>
                        <h4 className='invContainer__headers--header'>LAST ORDERED</h4>
                        <h4 className='invContainer__headers--header'>LOCATION</h4>
                        <h4 className='invContainer__headers--header'>QUANTITY</h4>
                        <h4 className='invContainer__headers--statusheader'>STATUS</h4>
                    </div>
                    <div>
                        {inventoryList}
                    </div>
                </div>
            );
        }
        else {
            return (
                <>
                </>
            );
        }
    }
}
