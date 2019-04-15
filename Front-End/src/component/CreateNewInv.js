import React, { Component } from 'react'
import '../styles/modal.scss';
import axios from 'axios';
import Switch from 'react-switch';

export default class CreateNewInv extends Component {
        constructor(){
            super();
            this.state ={ checked: false };
            this.handleChange = this.handleChange.bind(this);
            this.productForm = React.createRef();
        }
    handleChange(checked){
        this.setState({
            checked
        });
    }
    submitProduct = (e) => {
        e.preventDefault();

        let a = this.productForm.current;
        const newProduct = {
            name: a.nameInput.value,
            description: a.descriptInput.value,
            quantity: a.quantityInput.value,
            lastOrdered: a.lastOrderedInput.value,
            location: a.locationInput.value,
            country: a.countryInput.value,
            isInstock: a.stockInput.value
        }
        if (newProduct.name === "") {
            alert("Please insert product name");
            return false;
        }
        if (newProduct.location === "") {
            alert("Please insert a city");
            return false;
        }
        if (isNaN(newProduct.quantity) || newProduct.quantity === "") {
            alert("Please insert a quantity");
            return false;
        }
        if (newProduct.lastOrdered === "") {
            alert("Please insert when the product was last ordered");
            return false;
        }

        const config = {
            method: "post",
            url:"http://localhost:8080/inventory",
            data: newProduct,
            headers: {
                "Content-Type": "application/json"
            }
        };
        axios(config)
            .then(result => {
                console.log(result.data);
                this.props.fetchInv();
            })
            .catch(err => {
                console.log(err);
            })
    
        this.props.hide();
    }
    render(){
        return (
            <div className="modalBackground">
                <div className="popUp">
                    <div className="popUp__content">
                        <h1 className="popUp__content--title">Create New</h1>
                        <form className="popUp__content--form" ref={this.productForm} onSubmit={this.submitProduct}>
                            <div className="formInput">
                                <label className="titleLabel">PRODUCT
                                    <textarea className="formField" type="text" name="nameInput" placeholder="Item Name"/>
                                </label>
                                <label className="titleLabel">CITY
                                    <textarea className="formField" type="text" name="locationInput" placeholder="City"/>
                                </label>
                                <label className="titleLabel">QUANTITY
                                    <textarea className="formField" type="text" name="quantityInput" placeholder="0"/>
                                </label>
                            </div>
                            <div className="formInput">
                                <label className="titleLabel">LAST ORDERED
                                    <textarea className="formField" type="text" name="lastOrderedInput" placeholder="yyyy-mm-dd"/>
                                </label>
                                <label className="titleLabel">COUNTRY
                                    <select className="countryField" name="countryInput">
                                        <option value="Canada" defaultValue>Canada</option>
                                        <option value="United States">United States</option>
                                    </select>
                                </label>
                                <label className="statusLabel">STATUS
                                    <div className="stockField">
                                        <p className="stockText">In Stock</p>
                                        <Switch className="stockSwitch" name="stockInput" onChange={this.handleChange} checked={this.state.checked}
                                        uncheckedIcon={false} checkedIcon={false} height={24} width={40} />
                                    </div>
                                </label>
                            </div>
                            <div className="formDescript">
                                <label className="titleLabel">ITEM DESCRIPTION
                                    <textarea className="descriptField" type="text" name="descriptInput" placeholder="(Optional)"/>
                                </label>
                            </div>
                            <div className="formButtons">
                                <button className="cancelText" onClick={(e)=>{this.props.hide(e)}}>CANCEL</button>
                                <button className="saveButton" type="submit">SAVE</button>
                                <button className="cancelTextMobile" onClick={(e)=>{this.props.hide(e)}}>CANCEL</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}