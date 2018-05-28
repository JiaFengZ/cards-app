import React, { Component } from 'react';
import { Button, TouchableHighlight, FlatList, View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { getDecks } from '../AsyncStorage';

class Decks extends Component {
  state = {
  	decks: []
  }

  onPress(deck) {
  	this.props.navigation.navigate('CardDetail', {deck: deck});
  }

  componentDidMount() {
  	getDecks().then((res) => {
  		console.log(res);
  		let decks = [];
  		const data = JSON.parse(res);
  		/*for (let key in res) {
  			decks.push(res[key]);
  		}*/
  		
  		console.log(decks);
  		this.setState({
  			decks: data
  		})
  	})
  }

  render() {
    return (
      <ScrollView>
      	<FlatList
		  ItemSeparatorComponent={({highlighted}) => (
		    <View style={[style.separator, highlighted && {marginLeft: 0}]} />
		  )}
		  data={this.state.decks}
		  renderItem={({item, separators}) => (
		    <TouchableHighlight
		      onPress={() => this.onPress(item)}
		      onShowUnderlay={separators.highlight}
		      onHideUnderlay={separators.unhighlight}>
		      <View style={{backgroundColor: 'white', padding: 20, height: 100}}>
		        <Text style={{fontSize: 20, textAlign: 'center'}}>{item.title}</Text>
		        <Text style={{color: '#666', textAlign: 'center'}}>{item.questions.length}&nbsp;cards</Text>
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