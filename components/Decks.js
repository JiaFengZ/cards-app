import React, { Component } from 'react';
import { Button, TouchableHighlight, FlatList, View, Text, ScrollView, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { getDecks } from '../actions';

class Decks extends Component {
  state = {
    decksVersion: 0
  }

  onPress(deck) {
    this.props.navigation.navigate('DeckDetail', {deckKey: deck.key});
  }

  componentDidMount() {   
    this.props.dispatch(getDecks());
  }

  render() {
    const { decks } = this.props;    
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
              <View style={style.deckItem}>
                <Text style={{color: '#f2f2f2', fontSize: 20, textAlign: 'center'}}>{item.title}</Text>
                <Text style={{color: '#ddd', textAlign: 'center'}}>{item.questions.length}&nbsp;cards</Text>
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
  deckItem: {
    backgroundColor: '#68abc8', 
    padding: 20, 
    margin: 10,
    minHeight: 100,
    shadowColor: 'rgb(104, 171, 200)',
    shadowOpacity: 0.6,
    shadowOffset: {width: 0, height: 2},
    borderRadius: 5,
    elevation: 10
  }
});