import React, { Component } from 'react';
import "../styles/NavBar.scss";
import {Link} from "react-router-dom";

export default class NavBar extends Component{
    render(){
        return(
            <section className="navBar">
                <section className="navBar__box">"
                    <div className="logoLink"><Link to={"/warehouses"}><img className="navLogo" src="/assets/Logo/Logo-instock.svg" alt="InStock"/></Link></div>
                    <div className="navTabs">
                        <Link to={"/inventory"}><p className="navTabs--inventory" href="">Inventory</p></Link>
                        <Link to={"/warehouses"}><p className="navTabs--locations" href="">Locations</p></Link>
                    </div>
                </section>
            </section>
        )
    }
}