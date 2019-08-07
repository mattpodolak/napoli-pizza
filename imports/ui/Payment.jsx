import {
    AppProvider, 
    Navigation, 
    TopBar,
    Frame,
} from '@shopify/polaris';
import {    
  ArrowLeftMinor,
} from '@shopify/polaris-icons';
import React from 'react';

import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

export default class Payment extends React.Component {
  state = {
    showMobileNavigation: false,
  };

  render() {
    const {
      showMobileNavigation,
    } = this.state;


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
              label: 'Back to Checkout',
              icon: ArrowLeftMinor,
              url: '/checkout',
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
          <Frame
            topBar={topBarMarkup}
            navigation={navigationMarkup}
            showMobileNavigation={showMobileNavigation}
            onNavigationDismiss={this.toggleState('showMobileNavigation')}
          >
          <StripeProvider apiKey="pk_live_ng1k2lsZWrGZJ8dzL5pRsWKY00BrNOVLPi">
            <Elements>
              <CheckoutForm/>
            </Elements>
          </StripeProvider>
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