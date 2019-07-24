import {
    AppProvider, 
    Page, 
    Card, 
    Toast, 
    Navigation, 
    ContextualSaveBar,
    TopBar,
    Layout,
    FormLayout,
    TextField,
    TextContainer,
    SkeletonBodyText,
    SkeletonDisplayText,
    SkeletonPage,
    Modal,
    Frame,
    Loading,
    Button,
    Stack,
    Badge,
    RadioButton,
    ChoiceList,
    Subheading,
    Heading,
    Select,
    EmptyState,
    CalloutCard,
    List,
    TextStyle
} from '@shopify/polaris';
import {    
  ArrowLeftMinor
} from '@shopify/polaris-icons';
import React from 'react';

import { withTracker } from 'meteor/react-meteor-data';
import { Carts } from '../api/carts.js';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

export function TotalPrice(props){
    var cartItems = props.cart;
    var deliveryReq = props.delivery;
    var delivery = 0;
    var subtotal = 0;
    var tax = 0;
    var total = 0;

    if(cartItems != null){
      //check if any items not free deliv
      for(var i=0; i < cartItems.length; i++){
        if(cartItems[i].category != 'freedelivery'){
          delivery = 7;
        }
        subtotal = Number(cartItems[i].price) + subtotal;
      }

      if(deliveryReq!= null){
        //if delivery was not requested set price to 0
        if(deliveryReq == 'Pickup'){
          delivery = 0;
        }
      }

      tax = (delivery+subtotal)*0.13;
      total = subtotal+delivery+tax;
    }



    subtotal = subtotal.toFixed(2);
    delivery = delivery.toFixed(2);
    tax = tax.toFixed(2);
    total = total.toFixed(2);

    const prices = (
      <Stack vertical={true} spacing="extraTight">
          <TextStyle variation="subdued">Subtotal: {subtotal}</TextStyle>
          <TextStyle variation="subdued">Delivery: {delivery}</TextStyle>
          <TextStyle variation="subdued">Tax: {tax}</TextStyle>
          <TextStyle variation="strong">Total: {total}</TextStyle>
      </Stack>
    );
        return prices;
  }