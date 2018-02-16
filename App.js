import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button,  } from 'react-native';

//create header component
class Header extends Component {
  render(){
    return(
      <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>{this.props.name}</Text>
      </View>
    );
  }
}

/* ALTERNATE WAY TO WRITE COMPONENTS
const MoreText = () => {
  const { textStyle } = styles;
  return <Text styles={textStyles}>Let's see!!</Text>
}*/

//build the app using components
export default class App extends Component {
  render() { 
    return (
      <View>
        <Header name='Albums'/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor : '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20
  }
});