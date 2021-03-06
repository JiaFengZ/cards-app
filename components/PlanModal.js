import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Picker, Alert} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import TouchButton from './share/TouchButton';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { getDecks, addPlan } from '../actions';
import { addNotification, clearLocalNotification } from '../Notification';
import { timeToString, sringToDate } from '../helpers';

class PlanModal extends Component {
  state = {  
    isDateTimePickerVisible: false,
    selectedDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    selectedDeck: this.props.decks[0]  
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
      Alert.alert(
      '提示',
      '请选择日期！',
      [        
        {text: '确定', onPress: () => {}},
      ])    
      return;
    } else if (!this.state.selectedDeck) {      
      Alert.alert(
      '提示',
      '请选择卡片集！',
      [        
        {text: '确定', onPress: () => {}},
      ])
      return;
    }
    this.props.dispatch(addPlan({date: this.state.selectedDate, deck: this.state.selectedDeck}));
    this.props.setModalVisible(false);
    const date = timeToString(this.state.selectedDate);
    clearLocalNotification();
    addNotification(date);    
  }

  render() {    
    return (
      <Modal
        animationType="slide"
        transparent={false}        
        visible={this.props.modalVisible}
        onRequestClose={() => {
          this.props.setModalVisible(false)
        }}>
        <View style={{marginTop: 22, alignItems: 'center', width: '100%'}}>
          <View>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
              minimumDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
            />
            <Text>选择计划测试的卡片集</Text>
            <Picker
              selectedValue={this.state.selectedDeck}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => this.handleDeckPicked(itemValue)}>              
              {this.props.decks.map((deck) => <Picker.Item label={deck.title} value={deck} key={deck.key}/>)}
            </Picker>

            <Text>选择计划测试的日期</Text>
            <TouchableHighlight style={{ marginTop: 10, marginBottom: 20}} underlayColor='#eee' onPress={this.showDateTimePicker}>              
              <Ionicons name="ios-add-circle" size={20} color='#ddd'><Text style={{color: '#333', fontSize: 16}}>&nbsp;&nbsp;{timeToString(this.state.selectedDate)}</Text></Ionicons>
            </TouchableHighlight>            

            <TouchButton width={120} text='确定' handlePress={this.addPlan}/>
            <TouchButton width={120} text='取消' handlePress={() => this.props.setModalVisible(false)}/>
          </View>
        </View>
      </Modal>   
    );
  }
}

export default connect()(PlanModal)