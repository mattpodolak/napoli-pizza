import {
    AppProvider, 
    Page, 
    Card, 
    Navigation, 
    TopBar,
    Layout,
    TextContainer,
    SkeletonBodyText,
    SkeletonDisplayText,
    SkeletonPage,
    Frame,
    Loading,
    EmptyState
} from '@shopify/polaris';
import {    
  ArrowLeftMinor
} from '@shopify/polaris-icons';
import React from 'react';

export default class MissingPage extends React.Component {
  state = {
    isLoading: false,
    showMobileNavigation: false,
  };

  render() {
    const {
      isLoading,
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
      </Navigation>
    );

    const loadingMarkup = isLoading ? <Loading /> : null;

    const actualPageMarkup = (
      <Page title="Page Not Found">
        <Layout>
            <Layout.Section>
                <EmptyState
                    heading="Sorry the page you're looking for does not exist :("
                    action={{content: 'Return Home', url: '/'}}
                    image="https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg"
                >
                </EmptyState>
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