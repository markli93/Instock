import React, { Component } from 'react';
import WarehouseLocation from './WarehouseLocation';
import '../styles/warehouseList.scss';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import "../styles/addWarehouse.scss";

export default class WarehouseList extends Component {
    constructor(){
        super();
        this.uploadForm = React.createRef();
    }

    state = {
        warehouseList: [],
        open: false,
    };
       
    onOpenModal = () => {
        this.setState({ open: !this.state.open });
    };
    
    onCloseModal = () => {
        this.setState({ open: !this.state.open });
    };
    
    componentDidMount() {
        axios.get('http://localhost:8080/warehouses')
            .then(response => {
                this.setState({
                    warehouseList: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    completedUploadForm = (e) => {
        e.preventDefault();

        let nameInput = this.uploadForm.current.name.value;
        let addressInput = {
            street: this.uploadForm.current.address_street.value,
            suiteNum: Number(this.uploadForm.current.address_suiteNum.value),
            city: this.uploadForm.current.address_city.value,
            province: this.uploadForm.current.address_province.value,
            postal: this.uploadForm.current.address_postal.value
        }
        let contactInput = {
            name: this.uploadForm.current.contact_name.value,
            title: this.uploadForm.current.contact_position.value,
            phone: Number(this.uploadForm.current.contact_phone.value),
            email: this.uploadForm.current.contact_email.value
        }
        let inventoryCategInput = this.uploadForm.current.inventoryName.value

        var newWarehouse = {
            name: nameInput,
            address: addressInput,
            contact: contactInput,
            inventoryCategories: inventoryCategInput
        }

        const config = {
            method: 'Post',
            url: 'http://localhost:8080/warehouses',
            data: newWarehouse,
            headers: {
                'content-type': 'application/json'
            }
          };
      
        axios(config) 
          .then(resp =>{
            this.setState({
                warehouseList: this.state.warehouseList.concat(resp.data[resp.data.length -1]),
                open: false
              });
          })
          .catch( (error) =>{
            console.log(error);
          });
      }

    render() {
        return (
            <div className="warehouseList wrapper">
                <div className="warehouseHeader">
                    <h1 className="warehouseHeader__title">Locations</h1> 
                    <form id="warehouseList__search">
                        <input type="text" name="search" placeholder="Search" id="warehouseList__search--text" required></input>
                    </form>
                </div> 
                <div className="warehouseList__addButton" onClick={this.onOpenModal}>
                    <img src="assets/Icon/SVG/Icon-add.svg" alt=""/>
                </div>
                <div className="warehouseSubtitles">
                    <h3 className="warehouseSubtitles__name warehouseSubtitles__name--margin">WAREHOUSE</h3>
                    <h3 className="warehouseSubtitles__name">CONTACT</h3>
                    <h3 className="warehouseSubtitles__name warehouseSubtitles__name--margin">CONTACT INFORMATION</h3>
                    <h3 className="warehouseSubtitles__name">CATEGORIES</h3>
                </div>
                {this.state.warehouseList.map(location => {
                    return <WarehouseLocation 
                        name={location.name} 
                        contactDetails={location.contact} 
                        key={location.id} 
                        id={location.id} 
                        categories={location.inventoryCategories}
                        addressDetails={location.address}/>;
                })}
                <Modal open={this.state.open} onClose={this.onCloseModal} center>      
                    <h1 className="form__header">Add New</h1>
                    <form ref={this.uploadForm} onSubmit={this.completedUploadForm}>
                        <div className="form__nameInput">
                            <section>
                            <label>WAREHOUSE</label>
                            <textarea name="name" type="text" placeholder="Name & ID"></textarea>
                            </section>
                        </div>
                        <div className="form__addressInputs">
                            <section>
                            <label>ADDRESS</label>
                            <textarea name="address_street" type="text" placeholder="Enter Address"></textarea>
                            <textarea name="address_suiteNum" type="text" placeholder="Suite Number" className="form__addressInputs-suite"></textarea>
                            <textarea name="address_postal" type="text" placeholder="Postal Code" className="form__addressInputs-postal"></textarea>
                            </section>
                            <section>
                            <label>LOCATION</label>
                                <select name="address_city">
                                <option value="Toronto">Toronto</option>
                                <option value="Vancouver">Vancouver</option>
                                <option value="Montreal">Montreal</option>
                                </select>            
                                <select name="address_province" className="form__addressInputs-province">
                                <option value="Ontario">Ontario</option>
                                <option value="British Columbia">British Columbia</option>
                                <option value="Quebec">Quebec</option>
                                </select>            
                            </section>
                        </div>
                        <div className="form__contactInputs1">
                            <section>
                            <label>CONTACT NAME</label>
                            <textarea name="contact_name" type="text" placeholder="Enter Name"></textarea>
                            </section>
                            <section>
                            <label>POSITION</label>
                            <textarea name="contact_position"type="text" placeholder="Enter Position"></textarea>
                            </section>
                        </div>
                        <div className="form__contactInputs2">
                            <section>
                            <label>PHONE NUMBER</label>
                            <textarea name="contact_phone" type="text" placeholder="(000)-000-0000"></textarea>
                            </section>
                            <section>
                            <label>EMAIL</label>
                            <textarea name="contact_email" type="text" placeholder="email@instock.com"></textarea>
                            </section>
                        </div>
                        <div className="form__inventory">
                        <section>
                            <label>CATEGORIES</label>
                            <textarea name="inventoryName" type="text" placeholder="Use commas to separate each category"></textarea>
                        </section>
                        </div>
                        <div className="buttons">
                        <button onClick={this.onCloseModal} type="button" className="buttons__cancel">CANCEL</button>
                        <button onSubmit={this.completedUploadForm} type="submit" className="buttons__save">SAVE</button>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}
