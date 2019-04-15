import React, { Component } from 'react';
import WarehouseList from "./WarehouseList";
import axios from "axios";


export default class AddWarehouse extends Component{
    constructor(){
        super();
        this.uploadForm = React.createRef();
    }

    completedUploadForm = (e) => {
        e.preventDefault();

        let nameInput = this.uploadForm.current.name.value;
        let addressInput = {
            street = this.uploadForm.current.address-street.value,
            suiteNum = this.uploadForm.current.address-suiteNum.value,
            city = this.uploadForm.current.address-city.value,
            province = this.uploadForm.current.address-province.value,
            postal = this.uploadForm.current.address-postal.value
        }
        let contactInput = {
            name = this.uploadForm.current.contact-name.value,
            title = this.uploadForm.current.contact-title.value,
            phone = this.uploadForm.current.contact-phone.value,
            email = this.uploadForm.current.contact-email.value
        }
        let inventoryCategInput = this.uploadForm.current.inventoryCateg.value

        var newWarehouse = {
            id: "9bgwgr3u",
            name: nameInput,
            address: addressInput,
            contact: contactInput,
            inventoryCategories: inventoryCategInput
        }

        axios.post('http://localhost:8080/warehouses', 
        {
            newWarehouse
        })
          .then( (resp) =>{
            newWarehouse = resp.data;
            console.log(resp.data)
          })
          .catch( (error) =>{
            console.log(error);
          });
    }
    
    renders(){
        returns(
          <>
          <button onClick={this.onOpenModal}>Open modal</button>      
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
                      <textarea name="address-street" type="text" placeholder="Enter Address"></textarea>
                      <textarea name="address-suiteNum" type="text" placeholder="Suite Number" className="form__addressInputs-suite"></textarea>
                      
                    </section>
                    <section>
                    <label>LOCATION</label>
                        <select name="address-city">
                          <option value="Toronto">Toronto</option>
                          <option value="Vancouver">Vancouver</option>
                          <option value="Montreal">Montreal</option>
                        </select>            
                        <select name="address-province" className="form__addressInputs-province">
                          <option value="Ontario">Ontario</option>
                          <option value="British Columbia">British Columbia</option>
                          <option value="Quebec">Quebec</option>
                        </select>            
                    </section>
                  </div>
                  <div className="form__contactInputs1">
                    <section>
                      <label>CONTACT NAME</label>
                      <textarea name="contact-name" type="text" placeholder="Enter Name"></textarea>
                    </section>
                    <section>
                      <label>POSITION</label>
                      <textarea name="contact-position"type="text" placeholder="Enter Position"></textarea>
                    </section>
                  </div>
                  <div className="form__contactInputs2">
                    <section>
                      <label>PHONE NUMBER</label>
                      <textarea name="contact-phone" type="text" placeholder="(000)-000-0000"></textarea>
                    </section>
                    <section>
                      <label>EMAIL</label>
                      <textarea name="contact-email" type="text" placeholder="email@instock.com"></textarea>
                    </section>
                  </div>
                    <div className="form__inventory">
                      <section>
                        <label>CATEGORIES</label>
                        <textarea name="inventoryName" type="text" placeholder="Use commas to separate each category"></textarea>
                      </section>
                    </div>
                    <div className="buttons">
                      <button onClick={this.cancelForm} type="button" className="buttons__cancel">CANCEL</button>
                      <button onClick={this.completedUploadForm} type="submit" className="buttons__save">SAVE</button>
                    </div>
                </form>
          </Modal>
        </>
          )
    }
}