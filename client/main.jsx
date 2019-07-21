import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from "react-dom";
import Menu from '/imports/ui/Menu.jsx'
import Cart from '/imports/ui/Cart.jsx'
import Checkout from '/imports/ui/Checkout.jsx'
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import {AppProvider} from '@shopify/polaris';

import '../imports/startup/accounts-config.js';

var hist = createBrowserHistory();

Meteor.startup(() => {
  ReactDOM.render(
    <AppProvider>
      <Router history={hist}>
        <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/cart" component={Cart} />
        <Route path="/menu" component={Menu} />
          <Route exact path="/" component={Menu} />
        </Switch>
      </Router>
    </AppProvider>,
    document.getElementById("react-target")
  );
});
