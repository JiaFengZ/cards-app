import { TouchableHighlight, Text } from 'react-native';
import React from 'react';

export default function TouchButton(props) {
	return (
		<TouchableHighlight
      underlayColor='#841584'
      style={{backgroundColor: '#1194f6', borderRadius: 5, width: props.width||'100%', margin: 10, padding: 5}}
      onPress={props.handlePress}>
      <Text style={{color: '#fff', textAlign: 'center'}}>{props.text}</Text>
    </TouchableHighlight>
	)	
}
