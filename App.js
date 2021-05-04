import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ProviderEvent from './src/components/event/provider-event';

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isTestingAsProvider: false, 
      isTestingAsUser: false
    }
  }

  renderTestingOptions() {
    return (
      <View>
        <Text>I want to test Haven as a provider.</Text>
        <Text>I want to test Haven as a user.</Text>
      </View>
    );

  }

  render() {
    if (this.state.isTestingAsProvider) {
      return <ProviderEvent></ProviderEvent>
    }

    if (this.state.isTestingAsUser) {
      // return the user's view
    }

    return (
      <SafeAreaProvider>
        <View style={styles.basicTestOptions}>
          <Text onPress={() => this.setState({isTestingAsProvider: true})}>I want to test Haven as a provider.</Text>
          <Text onPress={() => this.setState({isTestingAsUser: true})}>I want to test Haven as a user.</Text>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  basicTestOptions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
