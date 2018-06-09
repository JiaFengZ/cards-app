import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Picker} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { getDecks, addPlan } from '../actions';
import { addNotification } from '../helper';

class PlanModal extends Component {
  state = {  
    isDateTimePickerVisible: false,
    selectedDate: null,
    selectedDeck: null  
  }


  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = (date) => {    
    this.hideDateTimePicker();
    this.setState({
      selectedDate: date      
    })
  }

  handleDeckPicked = (deck) => {    
    this.setState({
      selectedDeck: deck
    })
  }

  addPlan = () => {
    if (!this.state.selectedDate) {
      alert('请选择日期！');
      return;
    } else if (!this.state.selectedDeck) {
      alert('请选择卡片集！');
      return;
    }
    this.props.dispatch(addPlan({date: this.state.selectedDate, deck: this.state.selectedDeck}));
    this.props.setModalVisible(false);
    const date = this.state.selectedDate.getFullYear() + '-' + 
          ((this.state.selectedDate.getMonth() + 1) < 10 ? ('0' + (this.state.selectedDate.getMonth() + 1)) : (this.state.selectedDate.getMonth() + 1)) + '-' + 
          (this.state.selectedDate.getDate() < 10 ? ('0' + this.state.selectedDate.getDate()) : this.state.selectedDate.getDate())  
    addNotification(date);
    //clearLocalNotification().then(() => setLocalNotification()); //添加了学习计划，更新通知
  }

  componentDidMount() {   
    this.props.dispatch(getDecks());
  }

  render() {    
    return (
      <Modal
        animationType="slide"
        transparent={false}        
        visible={this.props.modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View style={{marginTop: 22, alignItems: 'center', width: '100%'}}>
          <View>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
            />
            <Text>选择计划测试的卡片集</Text>
            <Picker
              selectedValue={this.state.selectedDeck}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => this.handleDeckPicked(itemValue)}>              
              {this.props.decks.map((deck) => <Picker.Item label={deck.title} value={deck} key={deck.key}/>)}
            </Picker>

            <Text>选择计划测试的日期</Text>
            <TouchableHighlight underlayColor='#eee' onPress={this.showDateTimePicker}>              
              <Ionicons name="ios-add-circle" size={20} color='#ddd'></Ionicons>
            </TouchableHighlight>            

            <TouchableHighlight
              underlayColor='#841584'
              style={{backgroundColor: '#1194f6', width: 120, margin: 10}}
              onPress={() => {
                this.addPlan();
              }}>
              <Text style={{color: '#fff', textAlign: 'center'}}>添加</Text>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor='#841584'
              style={{backgroundColor: '#1194f6', width: 120, margin: 10}}
              onPress={() => {
                this.props.setModalVisible(false);
              }}>
              <Text style={{color: '#fff', textAlign: 'center'}}>取消</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>   
    );
  }
}

function mapStateToProps(state) {  
  return {
    decks: state.data
  }
}

export default connect(
  mapStateToProps
)(PlanModal)