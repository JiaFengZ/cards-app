import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

class Card extends Component {
  render() {
    return (
      <View>
      	<Button
		  onPress={() => this.props.navigation.goBack()}
		  title="goback Decks"
		  color="#841584"
		  accessibilityLabel="Learn more about this purple button"
		/>
      </View>
    )
  }
}

export default Card;