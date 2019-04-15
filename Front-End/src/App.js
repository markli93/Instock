import React, { Component } from 'react';
import NavBar from "./component/NavBar";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './styles/Font/stylesheet.css';
import InventoryList from './component/InventoryList';
import WarehouseList from './component/WarehouseList';
import WarehouseInventory from './component/WarehouseInventory';
import Item from './component/Item';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <NavBar/>
                    <Switch>
                        <Route exact path="/" render={() => (<Redirect to='inventory' />)} />
                        <Route exact path="/warehouses" render={props => (<WarehouseList {...props}/>)} />
                        <Route path="/inventory" exact render={props => (<InventoryList {...props}/>)}/>
                        <Route path="/warehouses/:warehouseId" render={props => (<WarehouseInventory {...props}/>)} />
                        <Route path="/inventory/:id" component={Item} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;