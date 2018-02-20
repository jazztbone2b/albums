import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button,  } from 'react-native';

//use npm install --save axios, then import the library to get https requests
import axios from 'axios';

//create header component
class Header extends Component {
  render() {
    return(
      <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>{this.props.name}</Text>
      </View>
    );
  }
}

class AlbumList extends Component {
  //first step
  //initial state
  state = { albums: [] };

  //second state
  //https request!
  componentWillMount() {
    axios.get('https://rallycoding.herokuapp.com/api/music_albums').then(response => this.setState({ albums: response.data }));
  }
  
  render() {
    console.log(this.state);

    return(
      <View>
        <Text>Album List</Text>
      </View>
    );
  }
}

//build the app using components
export default class App extends Component {
  render() { 
    return (
      <View>
        <Header name='Albums'/>
        <AlbumList />
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