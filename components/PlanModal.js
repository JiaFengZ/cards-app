import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Picker} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class PlanModal extends Component {
  state = {
    deck: null,
    isDateTimePickerVisible: false
  }


  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.hideDateTimePicker();
  };

  render() {    
    return (
      <Modal
        animationType="slide"
        transparent={false}        
        visible={this.props.modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View style={{marginTop: 22}}>
          <View>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
            />

            <Picker
              selectedValue={this.state.language}
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) => this.setState({deck: itemValue})}>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>

            <TouchableHighlight onPress={this.showDateTimePicker}>
              <Text>选择日期</Text>
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor='#841584'
              style={{backgroundColor: '#1194f6', width: 120, margin: 10}}
              onPress={() => {
                this.props.setModalVisible(false);
              }}>
              <Text style={{color: '#fff', textAlign: 'center'}}>关闭</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>   
    );
  }
}