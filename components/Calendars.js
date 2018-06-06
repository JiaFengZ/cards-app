import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import PlanModal from './PlanModal';
import { connect } from 'react-redux';
import { getPlanCalendar } from '../actions';

class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      modalVisible: false
    };
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  setModalVisible(visible) {
    console.log(visible)
    this.setState({modalVisible: visible});
  }

  componentDidMount() {   
    this.props.dispatch(getPlanCalendar());
  }

  render() {
    console.log(this.props.plans);
    const { plans } = this.props;
    const { items } = this.state;
    plans.forEach((plan) => {
      if (!items[plan.date]) {
        items[plan.date] = [];
      }
      if (plan.deck) {
        items[plan.date].push({text: '今天计划测试卡片集：' + plan.deck.title});  
      }      
    }) 
    return (
      <View style={{height: '100%'}}>
        <Agenda
          items={items}
          loadItemsForMonth={this.loadItems.bind(this)}
          renderItem={this.renderItem.bind(this)}          
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
        />
        <PlanModal setModalVisible={this.setModalVisible} modalVisible={this.state.modalVisible}/>
        <View style={{alignItems: 'center'}}>
          <TouchableHighlight
            underlayColor='#841584'
            style={{backgroundColor: '#1194f6', width: 120, margin: 10}}
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Text style={{color: '#fff', textAlign: 'center'}}>添加</Text>
          </TouchableHighlight>
        </View>
      </View>      
    );
  }

  loadItems(day) {
    let newItems = {};
    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);
      if (!newItems[strTime]) {
        newItems[strTime] = [];
      }      
    }            
    this.setState({
      items: newItems
    });
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.text}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text style={{color:'#666'}}>你今天没有计划</Text>      
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

function mapStateToProps(state) {  
  const { plans } = state;
  return {
    plans: state.plans,
    decks: state.data
  }
}

export default connect(
  mapStateToProps
)(AgendaScreen)

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30    
  }
});