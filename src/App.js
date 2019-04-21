import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import {Main} from './main-page';
import {Info} from './info-form/info';
import {GridView} from './grid-view/grid-view';
import {AddForm} from './add-form';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/main' component={Main}></Route>
          <Route path='/grid' component={GridView}></Route>
          <Route path='/add' component={AddForm}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
