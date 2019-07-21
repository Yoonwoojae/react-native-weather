import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Weather from './Weather';

const API_KEY = 'ac295839c2a65460f83f7236397366ec';

export default class App extends Component {
  state = {
    isLoaded: false,
    error: null,
    temperature: null,
    name: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this._getWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: error
        })
      }
    );
  };

  _getWeather = (lat, lon) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      )
      .then(response => response.json())
      .then(json => {
        this.setState({
          temperature: json.main.temp,
          name: json.weather[0].main,
          isLoaded: true
        })
      })
  }

  render() {
    const { isLoaded, error } = this.state;
    return (
    <View style={styles.container}>
      <StatusBar hidden={true}/>
      {isLoaded ? (
        <Weather /> 
      ) : (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Getting the react-native weather</Text>
        {error ? <Text style={styles.errorText}>error</Text> : null}
      </View>
      )}
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  errorText: {
    color: 'red',
    backgroundColor: 'transparent'
  },
  loading: {
    flex:1,
    backgroundColor: '#FDF6AA',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    paddingRight: 25
  },
  loadingText: {
    fontSize: 38,
    marginBottom: 24
  }
});
