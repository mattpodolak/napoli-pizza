import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from "react-dom";
import Menu from '/imports/ui/Menu.jsx'
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import {AppProvider} from '@shopify/polaris';

var hist = createBrowserHistory();

Meteor.startup(() => {
  ReactDOM.render(
    <AppProvider>
      <Router history={hist}>
        <Switch>
          <Route exact path="/" component={Menu} />
        </Switch>
      </Router>
    </AppProvider>,
    document.getElementById("react-target")
  );
});
