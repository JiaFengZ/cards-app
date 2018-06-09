import React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';
import { getPlanCalendar } from './AsyncStorage';

const NOTIFICATION_KEY = 'notifications';

export function timeToString (time = Date.now()) {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return todayUTC.toISOString().split('T')[0]
}

function sringToDate(str) {
  const date = str.split('-').map((item) => parseInt(item, 10));
  let today = new Date();
  today.setFullYear(date[0]);
  today.setMonth(date[1] - 1);
  today.setDate(date[2]);
  today.setHours(8);
  today.setMinutes(0);
  console.log(today);
  return today;
}

export function clearLocalNotification() { //清除提醒制定学习计划的通知
  return AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((key) => {
      if (key !== null) {
        Notifications.cancelScheduledNotificationAsync(key);
        AsyncStorage.removeItem(NOTIFICATION_KEY);
      }
    })
}


export function addNotification(planDate) {  //添加单个计划通知
  Permissions.askAsync(Permissions.NOTIFICATIONS)
    .then(({ status }) => {
      if (status === 'granted') {        
        Notifications.scheduleLocalNotificationAsync(
        createNotification({title: '今日计划！', body: '"👋 你今天制定了学习计划，不要忘记去学习哦!"'}),
        {
          time: sringToDate(planDate),
          repeat: 'day',
        }
      ).then((localNotificationId) => {
        return AsyncStorage.getItem('notificationsIdList')
        .then((result) => {
          let data = JSON.parse(result);      
          data.push({localNotificationId: localNotificationId, planDate: planDate});
          console.log(planDate + '计划通知', data)
          return AsyncStorage.setItem('notificationsIdList', JSON.stringify(data));
        })
      })                          
    }      
  })
}

function addNotifications(plans) { //批量添加计划通知
  Promise.all(plans.map((plan) => {
    return Notifications.scheduleLocalNotificationAsync(            
      createNotification({title: '今日计划！', body: '"👋 你今天制定了学习计划，不要忘记去学习哦!"'}),
      {
        time: sringToDate(plan.date),
        repeat: 'day',
      }
    )
  })).then((res) => {
    console.log(result);
    return AsyncStorage.getItem('notificationsIdList')
    .then((result) => {
      let data = JSON.parse(result);
      result.forEach(localNotificationId => data.push({localNotificationId: localNotificationId, planDate: plan.date}))      
      return AsyncStorage.setItem('notificationsIdList', JSON.stringify(data));
    })
  })
}

export function removeNotificationByDate(date) { //根据日期批量移除通知
  return AsyncStorage.getItem('notificationsIdList')
  .then((result) => {
    let data = JSON.parse(result);
    data = data.filter((item) => {
      if (date === item.planDate) {
        Notifications.cancelScheduledNotificationAsync(item.localNotificationId);
        return false;
      }
      return true;      
    });
    console.log(date + '移除计划通知:', data)
    return AsyncStorage.setItem('notificationsIdList', JSON.stringify(data));
  })
}


function getFuturePlans() {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate(); 
  return getPlanCalendar()
  .then((plans) => {
    return plans.filter((plan) => {
      const date = plan.date.split('-').map((item) => parseInt(item, 10));       
      if (date[0] > todayYear) {
        return true;
      } else if (date[0] == todayYear && date[1] > todayMonth) {
        return true;
      } else if (date[1] == todayMonth && date[2] >= todayDay) {
        return true;
      }
       else return false;            
    })
  })
}

function createNotification ({title, body}) {
  return {
    title: title,
    body: body,
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification() { //初始化设置通知  
  Permissions.askAsync(Permissions.NOTIFICATIONS)
    .then(({ status }) => {
      if (status === 'granted') {        
        getFuturePlans().then((plans) => {          
          if (plans.length === 0) {
            console.log('to set plan');   
            let today = new Date();
            today.setDate(today.getDate());
            today.setHours(today.getHours());
            today.setMinutes(today.getMinutes() + 1);
            Notifications.scheduleLocalNotificationAsync( //没有制定未来的计划，登陆app 1 分钟后发出一个制定计划的通知
              createNotification({title: '去制定计划！', body: '"👋 你最近没有学习计划，去制定你自己的学习计划吧!"'}),
              {
                time: today,
                repeat: 'day',
              }
            ).then((localNotificationId) => {
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(localNotificationId));
            })
          }
        })                                    
      }      
    })   
}