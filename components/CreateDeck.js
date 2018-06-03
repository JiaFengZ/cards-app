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
      <View style={{height: '100%', alignItems: 'center', padding: 20, justifyContent: 'space-between'}}>
      	<View>
          <Text style={{fontSize: 20, textAlign: 'center'}}>请输入卡片集的名称？</Text>
          <TextInput style={{width: 200, padding: 10}} placeholder="卡片集名称" value={this.state.title} onChangeText={(text) => this.updateDeckTitle(text)}></TextInput>  
        </View>        
      	<View style={{width: 120}}>
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

function mapStateToProps(state) {  
  return {
  }
}

export default connect(
  mapStateToProps
)(CreateDeck)