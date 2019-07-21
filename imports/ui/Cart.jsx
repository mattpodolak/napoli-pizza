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
    Select
} from '@shopify/polaris';
import {    
  ArrowLeftMinor
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

export class Cart extends React.Component {
  state = {
    showToast: false,
    isLoading: false,
    showMobileNavigation: false,
    removeCartItem: ""
  };

  deleteThisItem = (itemName, itemId) => {
    Meteor.call('carts.remove', itemId);
    this.setState({
      showToast: true,
      removeCartItem: itemName
    });
  }

  render() {
    const {
      showToast,
      isLoading,
      showMobileNavigation,
      removeCartItem
    } = this.state;

    const toastMarkup = showToast ? (
      <Toast
        onDismiss={this.toggleState('showToast')}
        content={"Removed " + removeCartItem + " from Cart"}
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
      </Navigation>
    );

    const loadingMarkup = isLoading ? <Loading /> : null;

    const actualPageMarkup = (
      <Page title="Cart">
        <Layout>
          <Layout.Section>
              {        
                  this.props.cart.map((cartItem) => (
                      <Card 
                      title={cartItem.itemName} 
                      sectioned
                      actions={[
                        {
                          content: 'Delete', 
                          destructive: true,
                          onAction: () => this.deleteThisItem(cartItem.itemName, cartItem._id)
                        },
                        ]}>
                      </Card>
                  ))
              }
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
}

export default withTracker(() => {
  Meteor.subscribe('carts');
  return {
    cart: Carts.find({userId: Meteor.userId()}, {sort: { createdAt: -1 }}).fetch(),
    cartCount: Carts.find({userId: Meteor.userId()}, {sort: { createdAt: -1 }}).count()
  };
})(Cart);