import React, { Component } from 'react';
import { Button, View, Text, ScrollView, StyleSheet } from 'react-native';

class Decks extends Component {
  render() {
    return (
      <ScrollView>
      	<Button
		  onPress={() => this.props.navigation.navigate('CardDetail')}
		  title="check crad detail"
		  color="#841584"
		  accessibilityLabel="Learn more about this purple button"
		/>
      </ScrollView>
    )
  }
}

export default Decks;