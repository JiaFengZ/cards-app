import { AsyncStorage } from 'react-native';
import { Notifications } from 'expo';

AsyncStorage.getItem('storage')
  .then(JSON.parse)
  .then(result => {
    if (result === null) {
      AsyncStorage.setItem('storage', JSON.stringify({
        'React': {
          title: 'React',
          key: 'React',
          questions: []
        }
      }));
    }
  })

AsyncStorage.getItem('plan')
  .then(JSON.parse)
  .then(result => {
    if (result === null) {
      AsyncStorage.setItem('plan', JSON.stringify({}));
    }
  })

AsyncStorage.getItem('notificationsIdList')
  .then(JSON.parse)
  .then(result => {
    if (result === null) {
      AsyncStorage.setItem('notificationsIdList', JSON.stringify([]));
    }
  })

export function getDecks() { //获取所有卡片集
  return AsyncStorage.getItem('storage')
  .then((result) => {    
    const data = JSON.parse(result);
    const keys = Object.keys(data);
    return keys.map((key) => data[key]);
  });
}

export function getDeck(deckKey) {  //获取卡片集详情
  return AsyncStorage.getItem('storage')
  .then((result) => {    
    const data = JSON.parse(result);
    return data[deckKey] || {};
  });
}

export function saveDeckTitle({key, title}) { //新建卡片集
  return AsyncStorage.mergeItem('storage', JSON.stringify({
    [key]: {title: title, key: key, questions: []}
  }))
}

export function addCardToDeck({question, answer, deckKey}) { //添加卡片到卡片集
  return AsyncStorage.getItem('storage')
  .then((result) => {
    const data = JSON.parse(result);
    const item = data[deckKey];
    item.questions.push({question: question, answer: answer});    
    return AsyncStorage.mergeItem('storage', JSON.stringify({
      [deckKey]: item
    }))
  })
}

export function removeDeck(deckKey) { //删除卡片集
  return AsyncStorage.getItem('storage')
  .then((result) => {    
    const data = JSON.parse(result);    
    delete data[deckKey];
    return AsyncStorage.setItem('storage', JSON.stringify(data));
  });
}

export function addPlan({date, deck}) {  //添加学习计划
  const planKey = new Date().getTime();
  return AsyncStorage.mergeItem('plan', JSON.stringify({
      [planKey]: {
        date: date.getFullYear() + '-' + 
          ((date.getMonth() + 1) < 10 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' + 
          (date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()),
        deck: deck,        
        key: planKey
      }
    }))
}

export function getPlanCalendar() { //获取所有学习计划
  return AsyncStorage.getItem('plan')
  .then((result) => {    
    const data = JSON.parse(result);
    const keys = Object.keys(data);
    return keys.map((key) => data[key]);
  });
}

export function removePlan(planKey) { //删除学习计划
  return AsyncStorage.getItem('plan')
  .then((result) => {    
    const data = JSON.parse(result);    
    delete data[planKey];
    return AsyncStorage.setItem('plan', JSON.stringify(data));
  });
}

export function hasPlanThisDay(date) { //判断特定日期是否有学习计划
  return AsyncStorage.getItem('plan')
  .then((result) => {    
    const data = JSON.parse(result);
    const keys = Object.keys(data);
    if (keys.length === 0) return false;
    return keys.map((key) => data[key]).some((item) => {
      return item.date === date;
    })    
  });
}