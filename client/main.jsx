import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from "react-dom";
import Menu from '/imports/ui/Menu.jsx'
import Cart from '/imports/ui/Cart.jsx'
import Checkout from '/imports/ui/Checkout.jsx'
import MissingPage from '/imports/ui/MissingPage.jsx'
import OrderConfirm from '/imports/ui/OrderConfirm.jsx'

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
          <Route 
            exact path="/order-confirm/:id" 
            component={OrderConfirm}
          />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/menu" component={Menu} />
          <Route exact path="/" component={Menu} />
          <Route component={MissingPage}/>
        </Switch>
      </Router>
    </AppProvider>,
    document.getElementById("react-target")
  );
});
