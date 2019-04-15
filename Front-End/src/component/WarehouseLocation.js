import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class WarehouseLocation extends Component {
    render() {
        const {addressDetails} = this.props;
        const {contactDetails} = this.props;
        return (
            <div className="warehouseContainer">
                <div className="warehouseContainer__name warehouseContainer--grow">
                    <Link to={`/warehouses/${this.props.id}`}><img src="assets/Icon/SVG/Icon-arrow-right.svg" alt="right arrow"/></Link>
                    <p className="warehouseContainer__name--text">{this.props.name}</p>
                    <p>{`${addressDetails.street}, ${addressDetails.city}, ${addressDetails.province}`}</p>
                </div>
                <div className="warehouseDetails">
                    <div className="warehouseDetails__contact warehouseDetails--grow">
                        <p>{contactDetails.name}</p>
                        <p>{contactDetails.title}</p>
                    </div>
                    <div className="warehouseDetails__contactDetails warehouseDetails--grow">
                        <p>{contactDetails.phone}</p>
                        <p className="warehouseDetails__contactDetails--italics">{contactDetails.email}</p>
                    </div>
                    <div className="warehouseDetails__categories warehouseDetails--grow">
                        <Link to={`/warehouses/${this.props.id}`}><img src="assets/Icon/SVG/Icon-arrow-right.svg" alt="right arrow"/></Link>
                        <p className="warehouseDetails__categories--text">{this.props.categories}</p>
                    </div>
                </div>
            </div>  
        )
    }
}