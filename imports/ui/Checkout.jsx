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
    RadioButton,
    ChoiceList,
    Subheading,
    Select,
    Form,
    CalloutCard
} from '@shopify/polaris';
import {    
  ArrowLeftMinor,
  CartMajorMonotone
} from '@shopify/polaris-icons';
import React from 'react';

import { withTracker } from 'meteor/react-meteor-data';
import { Carts } from '../api/carts.js';
import { Orders } from '../api/orders.js';
import { TotalPrice } from './TotalPrice.jsx'

import uniqid from 'uniqid';

const menuData = require('./menu/custom_json.json');
const toppingData = require('./menu/topping_json.json');
const pizzaDealsItems = menuData.pizza_deals;
const specialtyPizzaItems = menuData.specialty;
const freeDeliveryItems = menuData.freedelivery;
const wingsAndSandwichesItems = menuData.wingsandsandwiches;
const saladsItems = menuData.salads;
const sidesItems = menuData.sides;
const pitasItems = menuData.pitas;
const deliveryOptions = ['Delivery', 'Pickup'];
const paymentOptions = ['Cash', 'Debit/Credit']

export class Checkout extends React.Component {
  defaultState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addressOne: '',
    addressTwo: '',
    city: '',
    postal: '',
    instructions: '',
    paymentType: 'Cash',
    deliveryType: 'Delivery',
    buttonText: 'Submit Order'
  };

  state = {
    showToast: false,
    isLoading: false,
    showMobileNavigation: false,
    firstName: this.defaultState.firstName,
    lastName: this.defaultState.lastName,
    email: this.defaultState.email,
    phone: this.defaultState.phone,
    addressOne: this.defaultState.addressOne,
    addressTwo: this.defaultState.addressTwo,
    city: this.defaultState.city,
    postal: this.defaultState.postal,
    instructions: this.defaultState.instructions,
    paymentType: this.defaultState.paymentType,
    deliveryType: this.defaultState.deliveryType,
    buttonText: this.defaultState.buttonText,
    sendingOrder: false,
    firstNameError: '',
    lastNameError: '',
    emailError: '',
    phoneError: '',
    addressError: '',
    cityError: '',
    postalError: ''
  };

  render() {
    const {
      showToast,
      isLoading,
      showMobileNavigation,
      firstName,
      lastName,
      email,
      phone,
      addressOne,
      addressTwo,
      city,
      postal,
      instructions,
      paymentType,
      deliveryType,
      buttonText,
      sendingOrder,
      firstNameError,
      lastNameError,
      emailError,
      phoneError,
      addressError,
      cityError,
      postalError
    } = this.state;

    const toastMarkup = showToast ? (
      <Toast
        error
        onDismiss={this.toggleState('showToast')}
        content="Empty Cart"
        duration={1000}
      />
    ) : null;

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
              label: 'Back to Menu',
              icon: ArrowLeftMinor,
              url: '/menu',
              onClick: this.toggleState('isLoading'),
            },
          ]}
        />
        <Navigation.Section
          items={[
            {
                label: 'Cart',
                icon: CartMajorMonotone,
                badge: String(this.props.cartCount),
                onClick: this.toggleState('isLoading'),
                url: '/cart'
            }
          ]}
        />
      </Navigation>
    );

    const loadingMarkup = isLoading ? <Loading /> : null;

    const actualPageMarkup = (
      <Page title="Checkout">
        <Layout>
            <Layout.Section>
              <Card
                title="Cart Total"
                sectioned
              >
                <TotalPrice cart={this.props.cart} delivery={this.state.deliveryType}/>
              </Card>
              <Form onSubmit={this.handleSubmit}>
                <FormLayout>
                  <br/>
                <FormLayout.Group>
                    <TextField
                      value={firstName}
                      onChange={this.handleChange('firstName')}
                      label="First Name"
                      type="text"
                      maxLength={50} 
                      error={firstNameError}
                    />
                    <TextField
                      value={lastName}
                      onChange={this.handleChange('lastName')}
                      label="Last Name"
                      type="text"
                      maxLength={50}
                      error={lastNameError}
                    />
                  </FormLayout.Group>
                  <FormLayout.Group>
                    <TextField
                      value={email}
                      onChange={this.handleChange('email')}
                      label="Email"
                      type="email"
                      maxLength={50} 
                      error={emailError}
                    />
                    <TextField
                      value={phone}
                      onChange={this.handleChange('phone')}
                      label="Phone Number"
                      type="tel"
                      maxLength={11} 
                      error={phoneError}
                    />
                  </FormLayout.Group>
                  <FormLayout.Group>
                    <TextField
                        value={addressOne}
                        onChange={this.handleChange('addressOne')}
                        label="Address One"
                        type="text"
                        maxLength={50}
                        error={addressError} 
                      />
                      <TextField
                        value={addressTwo}
                        onChange={this.handleChange('addressTwo')}
                        label="Address Two"
                        type="text"
                        maxLength={30}
                      />
                  </FormLayout.Group>
                  <FormLayout.Group>
                    <TextField
                        value={city}
                        onChange={this.handleChange('city')}
                        label="City"
                        type="text"
                        maxLength={30} 
                        error={cityError}
                      />
                      <TextField
                        value={postal}
                        onChange={this.handleChange('postal')}
                        label="Postal Code"
                        type="text"
                        maxLength={7}
                        error={postalError}
                      />
                  </FormLayout.Group>
                  <FormLayout.Group>
                    <TextField
                        value={instructions}
                        onChange={this.handleChange('instructions')}
                        label="Delivery Instructions"
                        type="text"
                        maxLength={100} 
                        showCharacterCount={true}
                    />
                  </FormLayout.Group>
                  <FormLayout.Group>
                    <Select
                      options={deliveryOptions}
                      onChange={this.handleChange('deliveryType')}
                      value={deliveryType}
                    />
                    <Select
                      options={paymentOptions}
                      onChange={this.handleChange('paymentType')}
                      value={paymentType}
                    />

                  </FormLayout.Group>
                    <Button primary
                    submit
                    loading={sendingOrder}
                    onClick={() => this.submitOrder()}
                    >{buttonText}</Button>
                </FormLayout>
              </Form>
            </Layout.Section>
        </Layout>
      </Page>
    );

    const loadingPageMarkup = (
      <SkeletonPage>
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={2} />
              </TextContainer>
            </Card>
            <Card sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={2} />
              </TextContainer>
            </Card>
            <Card sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={2} />
              </TextContainer>
            </Card>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
    );

    const pageMarkup = isLoading ? loadingPageMarkup : actualPageMarkup;

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
          <Frame
            topBar={topBarMarkup}
            navigation={navigationMarkup}
            showMobileNavigation={showMobileNavigation}
            onNavigationDismiss={this.toggleState('showMobileNavigation')}
          >
            {loadingMarkup}
            {pageMarkup}
            {toastMarkup}
          </Frame>
        </AppProvider>
      </div>
    );
  }

  formValidation(){
    var formErrors = false

    var firstName = this.state.firstName.replace(" ", "")
    var lastName = this.state.lastName.replace(" ", "")
    var email = this.state.email.replace(" ", "")
    var phone = this.state.phone.replace(" ", "")
    var addressOne = this.state.addressOne.replace(" ", "")
    var city = this.state.city.replace(" ", "")
    var postal = this.state.postal.replace(" ", "")

    if(firstName.length == 0){
      formErrors = true
      this.setState({ firstNameError: 'First Name Required' });
    }
    if(lastName.length == 0 ){
      formErrors = true
      this.setState({ lastNameError: 'Last Name Required' });
    }
    if(email.length == 0 ){
      formErrors = true
      this.setState({ emailError: 'Email Required' });
    }
    if(phone.length == 0 ){
      formErrors = true
      this.setState({ phoneError: 'Phone Required' });
    }
    if(addressOne.length == 0){
      formErrors = true
      this.setState({ addressError: 'Address Required' });
    }
    if(city.length == 0){
      formErrors = true
      this.setState({ cityError: 'City Required' });
    }
    if(postal.length == 0){
      formErrors = true
      this.setState({ postalError: 'Postal Code Required' });
    }

    return formErrors

  }

  toggleState = (key) => {
    return () => {
      this.setState((prevState) => ({[key]: !prevState[key]}));
    };
  };

  handleSubmit = (event) => {
    this.setState({newsletter: false, email: ''});
  };

  changeButton = (buttonText) => {
    this.setState({ buttonText }); 
  } 

  submitOrder = () => {
    if(this.props.cartCount == 0){
      this.setState({showToast: true});
    }
    else if(!this.formValidation()){
      this.setState({ sendingOrder: true }); 

      var firstName = this.state.firstName
      var lastName = this.state.lastName
      var email = this.state.email
      var phone = this.state.phone
      var addressOne = this.state.addressOne
      var addressTwo = this.state.addressTwo
      var city = this.state.city
      var postal = this.state.postal
      var instructions = this.state.instructions
      var paymentType = this.state.paymentType
      var deliveryType = this.state.deliveryType

      let self = this;
      var orderNum = uniqid()

      Meteor.call("carts.send", orderNum, firstName, lastName, email, phone, addressOne, addressTwo, city, postal, instructions, paymentType, deliveryType, (error, result) => {
        console.log(result)
        if (!error && result){
          console.log(result)
          //insert order into DB
          Meteor.call('orders.insert', firstName, lastName, orderNum);
          Meteor.call('carts.removeAll');
          
          //pass orderId to order confirm page
          this.props.history.push('/order-confirm/'+String(orderNum))
        }
        else{
          console.log(error)
          this.setState({ sendingOrder: false }); 
          this.changeButton("Error: Try Again");
        }
      });

    }
    else{
      this.changeButton("Try Again");
    }
  };

  handleChange = (field) => {
    return (value) => this.setState({[field]: value});
  };

}

export default withTracker(() => {
  Meteor.subscribe('carts');
  Meteor.subscribe('orders');
  return {
    cart: Carts.find({userId: Meteor.userId()}, {sort: { createdAt: -1 }}).fetch(),
    cartCount: Carts.find({userId: Meteor.userId()}, {sort: { createdAt: -1 }}).count(),
    orders: Orders.find({userId: Meteor.userId()}, {sort: { createdAt: -1 }}).fetch(),
  };
})(Checkout);