import React, {Component} from 'react';
import {
    AppProvider, 
    Navigation, 
    TopBar,
    Frame,
    Card,
    Button,
    DisplayText,
    Stack,
    Page,
    Layout
} from '@shopify/polaris';
import {    
  ArrowLeftMinor,
  CartMajorMonotone
} from '@shopify/polaris-icons';
import {CardElement, injectStripe, CardCvcElement, CardExpiryElement, CardNumberElement} from 'react-stripe-elements';
import { withTracker } from 'meteor/react-meteor-data';
import { compose} from 'redux'
import { Route, Redirect } from 'react-router'

import { Carts } from '../api/carts.js';
import { Orders } from '../api/orders.js';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        pending: false, 
        buttonText: 'Send',
        showMobileNavigation: false,
        orderNum: null
    };
    this.submit = this.submit.bind(this);
  }

  submit = (ev) => {
    if(this.props.cartCount > 0){

        var subtotal = 0;
        //check if any items not free deliv
        for(var i=0; i < this.props.cartCount; i++){
          subtotal = Number(this.props.cart[i].price) + subtotal;
        }
        if(subtotal < 10){
            this.setState({buttonText: 'Error: 10$ Minimum'});
        }
        else{

            this.setState({pending: true, buttonText: 'Sending'});
        
            try{
                
                var orderNum = this.props.orders[0].orderNum;
                var firstName = this.props.orders[0].firstName;
                var lastName = this.props.orders[0].lastName;
                var email = this.props.orders[0].email;
                var phone = this.props.orders[0].phone;
                var addressOne = this.props.orders[0].addressOne;
                var addressTwo = this.props.orders[0].addressTwo;
                var city = this.props.orders[0].city;
                var postal = this.props.orders[0].postal;
                var instructions = this.props.orders[0].instructions;
                var paymentType = this.props.orders[0].paymentType;
                var deliveryType = this.props.orders[0].deliveryType;

                var name = String(firstName) + ' ' + String(lastName)

                let self = this;

                this.props.stripe.createToken({address_country: 'CA', name: name}).then(result => {
                    // Handle result.error or result.token
                    console.log(result)
                    if(result.error){
                        console.log('error', result.error);
                        throw new Error (result.error);
                    }
                    else{
                        const token = result.token;
                        Meteor.call("carts.sendpayment", token, orderNum, firstName, lastName, email, phone, addressOne, addressTwo, city, postal, instructions, paymentType, deliveryType, (error, result) => {
                            console.log(result)
                            if (!error && result){
                            console.log(result)
                            //insert order into DB
                            Meteor.call('carts.removeAll');

                            //pass orderId to order confirm page
                            self.setState({orderNum: orderNum});
                            }
                            else{
                                console.log('Failed to send payment');
                                self.setState({pending: false, buttonText: 'Error: Try Again'});
                            }
                        });
                    }
                }).catch(e => {
                    console.log('Payment Token Error: ', e)
                    this.setState({pending: false, buttonText: 'Error: Try Again'});
                });
            }
            catch(e){
                console.log('CheckoutForm Error: ', e);
                this.setState({pending: false, buttonText: 'Error: Try Again'});
            }
        }
    }
  }

  render() {  
    
    if(this.state.orderNum != null) return <Redirect to={'/order-confirm/'+this.state.orderNum}/>

    const topBarMarkup = (
        <TopBar
          showNavigationToggle={true}
          onNavigationToggle={this.toggleState('showMobileNavigation')}
        />
      );
  
      const navigationMarkup = (
        <Navigation location="/">
          <Navigation.Section
            items={[
              {
                label: 'Back to Cart',
                icon: ArrowLeftMinor,
                url: '/cart',
                onClick: this.toggleState('isLoading'),
              },
            ]}
          />
        </Navigation>
      );

    const theme = {
        colors: {
          topBar: {
            background: '#2c9c3e',
          }
        },
        logo: {
          width: 124,
          topBarSource:
          'https://i.imgur.com/27tOpx7.png',
          //DARK  'https://i.imgur.com/cSYvwrD.png',
          url: 'http://napolipizzeriacafe.com',
          accessibilityLabel: 'Napoli Pizza',
        },
    };

    return (
        <div style={{height: '500px'}}>
            <AppProvider theme={theme}>
                <Page title="Payment" separator>
                    <Layout>
                        <Layout.Section>
                            <Card sectioned>
                                    <DisplayText size="small">Would you like to complete the purchase?</DisplayText>
                                    <br/>
                                    <CardElement/>
                                    <br/>
                                    {
                                        this.state.pending &&
                                        <h3>Purchase Pending</h3>
                                    }
                                    {
                                        !this.state.pending &&
                                        <Button primary onClick={() => this.submit()}>{this.state.buttonText}</Button>
                                    }
                            </Card>
                        </Layout.Section>
                    </Layout>
                </Page>
            </AppProvider>
        </div>
    );
  }

  toggleState = (key) => {
    return () => {
      this.setState((prevState) => ({[key]: !prevState[key]}));
    };
  };
}

export default compose(
    withTracker((props) => {
        Meteor.subscribe('carts');
        Meteor.subscribe('orders');
        return {
          cart: Carts.find({userId: Meteor.userId()}, {sort: { createdAt: -1 }}).fetch(),
          cartCount: Carts.find({userId: Meteor.userId()}, {sort: { createdAt: -1 }}).count(),
          orders: Orders.find({userId: Meteor.userId()}, {sort: { createdAt: -1 }}).fetch(),
        };
    })
  )(injectStripe(CheckoutForm))