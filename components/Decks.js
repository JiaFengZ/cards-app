import React, { Component } from 'react';
import { Button, TouchableHighlight, FlatList, View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { getDecks } from '../actions';

class Decks extends Component {
  state = {
  	decksVersion: 0
  }

  onPress(deck) {
  	this.props.navigation.navigate('CardDetail', {deck: deck});
  }

  componentDidMount() {  	
    this.props.dispatch(getDecks());
  }

  render() {
    const { decks } = this.props;
    console.log(decks);
    return (
      <ScrollView>
      	<FlatList
    		  ItemSeparatorComponent={({highlighted}) => (
    		    <View style={[style.separator, highlighted && {marginLeft: 0}]} />
    		  )}
    		  data={decks}
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

function mapStateToProps(state) {  
  return {
    decks: state.data
  }
}

export default connect(
  mapStateToProps
)(Decks)

const style = StyleSheet.create({
  separator: {
    backgroundColor: '#eee',
    height: 5
  },
});