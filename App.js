import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button, Image  } from 'react-native';

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
  
  renderAlbums(){
    return this.state.albums.map(album => 
      <AlbumDetail key={album.title} album={album}/>
    );
  }

  render() {
    console.log(this.state);

    return(
      <View>
        {this.renderAlbums()}
      </View>
    );
  }
}

//using the Card component to render
//children elements
class AlbumDetail extends Component {
  render(){
    return(
      <Card>
        <CardSection>
          <View>

          </View>

          <View style={styles.headerContentStyle}>
            <Text>{this.props.album.title}</Text>
            <Text>{this.props.album.artist}</Text>
          </View>

        </CardSection>
      </Card>
    );
  }
}

//this.props.children tells the component to render
//whatever children it contains
class Card extends Component {
  render(){
    return(
      <View style={styles.cardStyle}>
        {this.props.children}
      </View>
    );
  }
}

class CardSection extends Component {
  render(){
    return(
      <View style={styles.cardSectionStyle}>
        {this.props.children}
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
  },
  cardStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderBottomWidth: 0,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  },
  cardSectionStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  },
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  }
});