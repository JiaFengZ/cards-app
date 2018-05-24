import React, { Component } from 'react';
import { Button, TouchableHighlight, FlatList, View, Text, ScrollView, StyleSheet, Platform } from 'react-native';

class Decks extends Component {
  onPress() {
  	this.props.navigation.navigate('CardDetail')
  }

  render() {
    return (
      <ScrollView>
      	<FlatList
		  ItemSeparatorComponent={({highlighted}) => (
		    <View style={[style.separator, highlighted && {marginLeft: 0}]} />
		  )}
		  data={[{title: 'decks1', key: 'item1', num: '12'},{title: 'deck2', key: 'item2', num: '13'},{title: 'decks3', key: 'item3', num: '11'}]}
		  renderItem={({item, separators}) => (
		    <TouchableHighlight
		      onPress={() => this.onPress(item)}
		      onShowUnderlay={separators.highlight}
		      onHideUnderlay={separators.unhighlight}>
		      <View style={{backgroundColor: 'white', padding: 20, height: 100}}>
		        <Text style={{fontSize: 20, textAlign: 'center'}}>{item.title}</Text>
		        <Text style={{color: '#666', textAlign: 'center'}}>{item.num}&nbsp;cards</Text>
		      </View>
		    </TouchableHighlight>
		  )}
		/>
      </ScrollView>
    )
  }
}

export default Decks;

const style = StyleSheet.create({
  separator: {
    backgroundColor: '#eee',
    height: 5
  },
});