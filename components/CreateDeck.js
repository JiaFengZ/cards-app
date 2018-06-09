import React, { Component } from 'react';
import { View, TextInput, Text, Alert, StyleSheet } from 'react-native';
import TouchButton from './share/TouchButton';
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
    if (!this.state.title) {
      Alert.alert(
      '提示',
      '请填写卡片集名称！',
      [        
        {text: '确定', onPress: () => {}},
      ])    
      return;
    }
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
          <TouchButton text='创建卡片集' handlePress={this.saveDeckTitle}/>
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
    backgroundColor: '#841584', 
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOpacity: 0.6,
    shadowOffset: {width: 0, height: 2},
    elevation: 10,
  }
});