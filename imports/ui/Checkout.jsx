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
    Form
} from '@shopify/polaris';
import {    
  ArrowLeftMinor,
  CartMajorMonotone
} from '@shopify/polaris-icons';
import React from 'react';

import { withTracker } from 'meteor/react-meteor-data';
import { Carts } from '../api/carts.js';

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
    deliveryType: 'Delivery'
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
    deliveryType: this.defaultState.deliveryType
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
      deliveryType
    } = this.state;

    const toastMarkup = showToast ? (
      <Toast
        onDismiss={this.toggleState('showToast')}
        content="Hello"
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
              <Form onSubmit={this.handleSubmit}>
                <FormLayout>
                <FormLayout.Group>
                    <TextField
                      value={firstName}
                      onChange={this.handleChange('firstName')}
                      label="First Name"
                      type="text"
                      maxLength={50} 
                    />
                    <TextField
                      value={lastName}
                      onChange={this.handleChange('lastName')}
                      label="Last Name"
                      type="text"
                      maxLength={50}
                    />
                  </FormLayout.Group>
                  <FormLayout.Group>
                    <TextField
                      value={email}
                      onChange={this.handleChange('email')}
                      label="Email"
                      type="email"
                      maxLength={50} 
                    />
                    <TextField
                      value={phone}
                      onChange={this.handleChange('phone')}
                      label="Phone Number"
                      type="tel"
                      maxLength={11} 
                    />
                  </FormLayout.Group>
                  <FormLayout.Group>
                    <TextField
                        value={addressOne}
                        onChange={this.handleChange('addressOne')}
                        label="Address One"
                        type="text"
                        maxLength={50} 
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
                      />
                      <TextField
                        value={postal}
                        onChange={this.handleChange('postal')}
                        label="Postal Code"
                        type="text"
                        maxLength={6}
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

                  <Button submit>Submit Order</Button>
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
          background: '#357997',
        },
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

  toggleState = (key) => {
    return () => {
      this.setState((prevState) => ({[key]: !prevState[key]}));
    };
  };

  handleSubmit = (event) => {
    this.setState({newsletter: false, email: ''});
  };

  handleChange = (field) => {
    return (value) => this.setState({[field]: value});
  };

}

export default withTracker(() => {
  Meteor.subscribe('carts');
  return {
    cart: Carts.find({userId: Meteor.userId()}, {sort: { createdAt: -1 }}).fetch(),
    cartCount: Carts.find({userId: Meteor.userId()}, {sort: { createdAt: -1 }}).count(),
  };
})(Checkout);