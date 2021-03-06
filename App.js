import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Linking, url  } from 'react-native';

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
      <ScrollView>
        {this.renderAlbums()}
      </ScrollView>
    );
  }
}

//using the Card component to render
//children elements
class AlbumDetail extends Component {
  render(){
    //destructure stylesheet to make code cleaner
    const { 
      thumbnailStyle, 
      headerContentStyle, 
      thumbnailContainerStyle,
      headerTextStyle,
      imageStyle 
    } = styles;

    return(
      <Card>
        <CardSection>
          <View style={thumbnailContainerStyle}>
            <Image source={{uri: this.props.album.thumbnail_image}} style={thumbnailStyle}/>
          </View>

          <View style={headerContentStyle}>
            <Text style={headerTextStyle}>{this.props.album.title}</Text>
            <Text>{this.props.album.artist}</Text>
          </View>

        </CardSection>

        <CardSection>
          <Image source={{ uri: this.props.album.image}} style={imageStyle}/>
        </CardSection>

        <CardSection>
          <Button onPress={() => Linking.openURL(this.props.album.url)}>
            Buy Now
          </Button>
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

class Button extends Component {
  render(){
    const { buttonStyle, buttonText } = styles;

    return(
      <TouchableOpacity onPress={this.props.onPress} style={buttonStyle}>
        <Text style={buttonText}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}


//build the app using components
//set the root view to flex: 1, this 
//fills the entire display with the content
export default class App extends Component {
  render() { 
    return (
      <View style={{ flex: 1 }}>
        <Header name='Albums'/>
        <AlbumList />
      </View>
    );
  }
}

//STYLESHEET//
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
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  },
  buttonText: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  }
});