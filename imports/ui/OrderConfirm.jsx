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
    EmptyState
} from '@shopify/polaris';
import {    
  ArrowLeftMinor
} from '@shopify/polaris-icons';
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Orders } from '../api/orders.js';

export class OrderConfirm extends React.Component{
  state = {
    isLoading: false,
    showMobileNavigation: false,
  };

  render() {
    const {
      isLoading,
      showMobileNavigation,
      order
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
          <Page>
          <Layout>
              <Layout.Section>
                {
                this.props.findOrder.length > 0 &&
                  <EmptyState
                      heading="Order Confirmed"
                      action={{content: 'Return Home', url: '/'}}
                      image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
                  >
                    <p>{"Order Number: " + this.props.findOrder[0].orderNum}</p>
                    <br/>
                    {/* <p>{"Your order was placed at " + this.props.findOrder[0].createdAt.getHours() +":" + this.props.findOrder[0].createdAt.getMinutes()+ " and will be ready in approx. 30-40mins"}</p> */}
                    <p>{"Your order was placed at " + this.props.findOrder[0].createdAt + " and will be ready in approx. 30-40mins"}</p>
                  </EmptyState>
                }
                {
                this.props.findOrder.length == 0 &&
                  <EmptyState
                      heading="This order does not exist"
                      action={{content: 'Return Home', url: '/'}}
                      image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
                  >
                  </EmptyState>
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

export default withTracker((props) => {
  Meteor.subscribe('orders');
  return {
    orders: Orders.find({userId: Meteor.userId()}, {sort: { createdAt: -1 }}).fetch(),
    findOrder: Orders.find({userId: Meteor.userId(), orderNum: props.match.params.id}, {sort: { createdAt: -1 }}).fetch(),
  };
})(OrderConfirm);