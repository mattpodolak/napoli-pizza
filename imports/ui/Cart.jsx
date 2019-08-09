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
import { TotalPrice } from './TotalPrice.jsx'
//import { Fiber } from 'fibers'

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
    removeCartItem: "",
    price: 0
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
      removeCartItem,
      price
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
            <CalloutCard
              title="Continue to checkout"
              primaryAction={{
                content: 'Checkout',
                url: '/checkout',
              }}
            >
            <TotalPrice cart={this.props.cart} delivery="Delivery" payment="Debit/Credit"/>
            </CalloutCard>
              {        
                this.props.cart.map((cartItem) => (
                    <Card 
                    title={cartItem.itemName + " $" + cartItem.price} 
                    sectioned
                    actions={[
                      {
                        content: 'Delete', 
                        destructive: true,
                        onAction: () => this.deleteThisItem(cartItem.itemName, cartItem._id)
                      },
                      ]}>
                        <Stack vertical={true} spacing="extraTight">
                          {
                            cartItem.addonValue == 'noAddons' &&
                            <TextStyle variation="strong">No Addons</TextStyle>
                          }
                          {
                            cartItem.addonValue != 'noAddons' &&
                            <TextStyle variation="strong">{cartItem.addonValue}</TextStyle>
                          }
                        {
                          cartItem.pizzaTop1 != null &&
                          <Stack alignment="center" spacing="tight">
                            <TextStyle variation="strong">Pizza 1 - Toppings:</TextStyle>
                          {
                            cartItem.pizzaTop1.length == 0 &&
                              <Badge>No toppings</Badge>
                          } 
                          {
                          cartItem.pizzaTop1.map((topName) => (
                            <Badge>{topName}</Badge>
                          ))
                          }
                          </Stack>
                        }
                        {
                          cartItem.pizzaTop2 != null &&
                          <Stack alignment="center" spacing="tight">
                            <TextStyle variation="strong">Pizza 2 - Toppings:</TextStyle>
                          {
                            cartItem.pizzaTop2.length == 0 &&
                              <Badge>No toppings</Badge>
                          } 
                          {
                          cartItem.pizzaTop2.map((topName) => (
                            <Badge>{topName}</Badge>
                          ))
                          }
                          </Stack>
                        }
                        {
                          cartItem.pizzaTop3 != null &&
                          <Stack alignment="center" spacing="tight">
                            <TextStyle variation="strong">Pizza 3 - Toppings:</TextStyle>
                          {
                            cartItem.pizzaTop3.length == 0 &&
                              <Badge>No toppings</Badge>
                          } 
                          {
                          cartItem.pizzaTop3.map((topName) => (
                            <Badge>{topName}</Badge>
                          ))
                          }
                          </Stack>
                        }
                        {
                          cartItem.pizzaTop4 != null &&
                          <Stack alignment="center" spacing="tight">
                            <TextStyle variation="strong">Pizza 4 - Toppings:</TextStyle>
                          {
                            cartItem.pizzaTop4.length == 0 &&
                              <Badge>No toppings</Badge>
                          } 
                          {
                          cartItem.pizzaTop4.map((topName) => (
                            <Badge>{topName}</Badge>
                          ))
                          }
                          </Stack>
                        }
                        {
                          cartItem.pop1 != null &&
                          <Stack alignment="center" spacing="tight">
                            <TextStyle variation="strong">Pop:</TextStyle>
                            <Badge>{cartItem.pop1}</Badge>
                            <Badge>{cartItem.pop2}</Badge>
                            <Badge>{cartItem.pop3}</Badge>
                            <Badge>{cartItem.pop4}</Badge>
                            <Badge>{cartItem.pop5}</Badge>
                            <Badge>{cartItem.pop6}</Badge>
                          </Stack>
                        }
                        {
                          cartItem.dip1 != null &&
                          <Stack alignment="center" spacing="tight">
                            <TextStyle variation="strong">Dip:</TextStyle>
                            <Badge>{cartItem.dip1}</Badge>
                            <Badge>{cartItem.dip2}</Badge>
                            <Badge>{cartItem.dip3}</Badge>
                            <Badge>{cartItem.dip4}</Badge>
                            <Badge>{cartItem.dip5}</Badge>
                            <Badge>{cartItem.dip6}</Badge>
                          </Stack>
                        }
                        {
                          cartItem.pasta != null &&
                          <Stack alignment="center" spacing="tight">
                            <TextStyle variation="strong">Pasta:</TextStyle>
                            <Badge>{cartItem.pasta}</Badge>
                          </Stack>
                        }
                        {
                          cartItem.wings != null &&
                          <Stack alignment="center" spacing="tight">
                            <TextStyle variation="strong">Wings:</TextStyle>
                            <Badge>{cartItem.wings}</Badge>
                          </Stack>
                        }
                        {
                          cartItem.chips != null &&
                          <Stack alignment="center" spacing="tight">
                            <TextStyle variation="strong">Chips:</TextStyle>
                            <Badge>{cartItem.chips}</Badge>
                          </Stack>
                        }
                        </Stack>
                    </Card>
                ))
              }
              {/* {
                this.props.cartCount == 0 &&
                  <EmptyState
                      heading="Your cart is empty"
                      action={{content: 'View Menu', url: '/menu'}}
                      image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
                  >
                  </EmptyState>
              } */}
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

  toggleState = (key) => {
    return () => {
      this.setState((prevState) => ({[key]: !prevState[key]}));
    };
  };
}

export default withTracker(() => {
  Meteor.subscribe('carts');

  // const wrappedCartFunction = Meteor.wrapAsync(Meteor.call("carts.totalPrice"));

  // const total = wrappedCartFunction();
  // console.log(total);

  // const total = new Promise((resolve, reject) => {
  //   Meteor.call("carts.totalPrice", (error, result) => {
  //     if (error) return reject(error);
  //     resolve(result);
  //   })
  // });

  //console.log(total)

  return {
    cart: Carts.find({userId: Meteor.userId()}, {sort: { createdAt: -1 }}).fetch(),
    cartCount: Carts.find({userId: Meteor.userId()}, {sort: { createdAt: -1 }}).count()
  };
})(Cart);