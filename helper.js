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

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function hasTodayPlan() {
  const today = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();  
  return getPlanCalendar()
  .then((plans) => {
    plans.some((plan) => {
      const date = plan.date.split('-').map((item) => parseInt(item, 10));
      if (date[0] == todayYear && date[1] == todayMonth && date[2] == todayDay) {
        return true;
      }
      return false;
    })
  })
}

function hasFuturePlan() {
  const today = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate(); 
  return getPlanCalendar()
  .then((plans) => {
    if (!plans.length) return false;
    return plans.some((plan) => {
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
    body: body, //"👋 你今天制定了学习计划，不要忘记去学习啦!",
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

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {        
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()              
              hasFuturePlan().then((result) => {
                if (result) {
                  console.log('has plan');
                  hasTodayPlan((result) => {  //明天制定了计划，明天发出一个通知
                    let today = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);                    
                    today.setHours(8)
                    today.setMinutes(0)
                    Notifications.scheduleLocalNotificationAsync(
                      createNotification({title: '今日计划！', body: '"👋 你今天制定了学习计划，不要忘记去学习哦!"'}),
                      {
                        time: today,
                        repeat: 'day',
                      }
                    )
                  })                 
                } else {                
                  console.log('to set plan');   
                  let today = new Date();
                  today.setDate(today.getDate())
                  today.setHours(today.getHours())
                  today.setMinutes(today.getMinutes() + 1)       
                  Notifications.scheduleLocalNotificationAsync( //没有制定未来的计划，登陆app 1 分钟后发出一个制定计划的通知
                    createNotification({title: '去制定计划！', body: '"👋 你最近没有学习计划，去制定你自己的学习计划吧!"'}),
                    {
                      time: today,
                      repeat: 'day',
                    }
                  )  
                }
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true)); 
              })                           
            }
          })
      }
    })
}