import React, { Component } from 'react';
import { View, Text, Button, TextInput, Switch, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addCardToDeck } from '../actions';

class CreateCard extends Component {
  constructor(props) {
    super(props);
    this.selectAnswer = this.selectAnswer.bind(this);
    this.updateCardQuestion = this.updateCardQuestion.bind(this);
    this.saveCard = this.saveCard.bind(this);
  }

  state = {
    answer: false,
    question: ''
  }

  selectAnswer(value) {
    this.setState({
      answer: value
    })
  }

  updateCardQuestion(value) {
    this.setState({
      question: value
    })
  }

  saveCard() {
    this.props.dispatch(addCardToDeck({
      question: this.state.question,
      answer: this.state.answer,
      deckKey: this.props.navigation.state.params.deckKey
    }));
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={style.container}>        
        <View>
          <TextInput style={{width: 200, padding: 10}} multiline={true} placeholder="请输入卡片问题" value={this.state.question} onChangeText={(text) => this.updateCardQuestion(text)}></TextInput>       
          <View style={{flexDirection: 'row', padding: 10}}>                    
            <Text>卡片答案：</Text>
            <Switch value={this.state.answer} onValueChange={(value) => this.selectAnswer(value)}></Switch>          
            <Text style={{color: '#999'}}>{this.state.answer?'正确':'错误'}</Text>
          </View>  
        </View>
        
        <View style={{width: 120}}> 
          <Button
            onPress={() => this.saveCard()}
            title="提交"
            color="#1194f6"     
            accessibilityLabel="submit the card"
          />
        </View>
      </View>
    )
  }
}

export default connect()(CreateCard);

const style = StyleSheet.create({  
  container: {
    height: '100%', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 20
  }
});