import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { clearLocalNotification, setLocalNotification } from '../helper';

class Quiz extends Component {
  constructor(props) {
  	super(props);
  	this.showAnswer = this.showAnswer.bind(this);
  	this.hideAnswer = this.hideAnswer.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
    this.reset = this.reset.bind(this);    
    clearLocalNotification().then(() => setLocalNotification()); //今天学习了，更新通知
  }

  state = {
  	showAnswer: false,
    score: 0,
    allQuestions: Array.isArray(this.props.navigation.state.params.questions) ? this.props.navigation.state.params.questions : [],
    curQuestionIndex: 0,
    isEnd: false
  }

  showAnswer() {
  	this.setState({
  		showAnswer: true
  	})
  }

  hideAnswer() {
  	this.setState({
  		showAnswer: false
  	})
  }

  selectAnswer(answer) {    
    console.log(answer)
    this.setState((preState) => {
      return {
        score: answer == this.state.allQuestions[this.state.curQuestionIndex].answer ? ++preState.score : preState.score,
        isEnd: preState.curQuestionIndex == preState.allQuestions.length - 1,
        curQuestionIndex: ++preState.curQuestionIndex
      }
    })
  }

  reset() {
    this.setState({
      score: 0,
      curQuestionIndex: 0,
      isEnd: false
    })
  }

  render() {
    if (this.state.isEnd) {
      return (
        <View style={{padding: 20, alignItems: 'center'}}>
          <Text>你已经完成所有问题，共答题{this.state.allQuestions.length}道，回答正确{this.state.score}道，得分{this.state.score}</Text>          
          <View style={{marginTop: 20, width: 120}}>
             <Button 
              onPress={() => this.props.navigation.goBack()}
              title="返回"
              color="#1194f6"
            />
          </View>
          <View style={{marginTop: 10, width: 120}}>
            <Button 
              onPress={this.reset}
              title="重新测试"
              color="#841584"
            />      
          </View>                                     
        </View>
      )
    } else {
      const question = this.state.allQuestions[this.state.curQuestionIndex] || {};
      return (
        <View style={{alignItems: 'center', justifyContent: 'space-between', height: '100%', padding: 20}}>        
          <Text style={{color: '#1194f6', fontSize: 18, alignSelf: 'flex-start'}}>{this.state.curQuestionIndex+1}/{this.state.allQuestions.length}</Text>
          {this.state.showAnswer ? (
            <Text style={{fontSize: 18}}>{question.answer?'正确':'错误'}</Text>
          ):(
            <Text style={{fontSize: 18, textAlign: 'center'}}>{question.question}</Text>       
          )}
          {this.state.showAnswer ? (          
            <TouchableOpacity onPress={this.hideAnswer}>
              <Text style={{color: '#d4271b'}}>问题</Text>
          </TouchableOpacity>
          ):(         
            <TouchableOpacity onPress={this.showAnswer}>
              <Text style={{color: '#d4271b'}}>答案</Text>
          </TouchableOpacity>
          )}
          <View>
            <View style={{width: 120, marginBottom: 10, marginTop: 20}}>
              <Button
                onPress={() => this.selectAnswer(true)}
                title="正确"
                color="#841584"     
                accessibilityLabel="submit the title of the deck"
              />
            </View>
            <View style={{width: 120}}>
              <Button
                onPress={() => this.selectAnswer(false)}
                title="错误"
                color="#d4271b"
                accessibilityLabel="submit the title of the deck"
              />
            </View>
          </View>
        </View>
      )
    }
    
  }
}

export default Quiz;