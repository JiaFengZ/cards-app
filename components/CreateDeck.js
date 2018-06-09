import React, { Component } from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import { saveDeckTitle } from '../AsyncStorage';
import { connect } from 'react-redux';
import { addDeck } from '../actions';

class CreateDeck extends Component {
  constructor(props) {
    super(props);
    this.saveDeckTitle = this.saveDeckTitle.bind(this);
  }

  state = {
    title: ''
  }

  saveDeckTitle() {    
    this.props.dispatch(addDeck({
      key: new Date().getTime().toString(),
      title: this.state.title
    }));
    this.setState({
      title: ''
    })
    this.props.navigation.goBack();
  }

  updateDeckTitle(value) {
    this.setState({
      title: value
    })
  }

  render() {
    return (
      <View style={style.container}>
        <View style={style.card}>
          <Text style={{fontSize: 20, color: '#ddd'}}>请输入卡片集的名称？</Text>
          <TextInput style={{padding: 10, color: '#ddd', borderColor: '#eee'}} placeholder="卡片集名称" value={this.state.title} onChangeText={(text) => this.updateDeckTitle(text)}></TextInput>  
        </View>        
        <View style={{width: 200}}>
          <Button
            onPress={() => this.saveDeckTitle()}
            title="创建卡片集"
            color="#1194f6"     
            accessibilityLabel="submit the title of the deck"
          />
        </View>
      </View>
    )
  }
}

export default connect()(CreateDeck);

const style = StyleSheet.create({  
  container: {
    height: '100%', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 20
  },
  card: {
    width: '80%',
    padding: 10,    
    borderRadius: 5,
    backgroundColor: '#68abc8', 
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOpacity: 0.6,
    shadowOffset: {width: 0, height: 2},
    elevation: 10,
  }
});