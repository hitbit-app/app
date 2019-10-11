'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  scrollViewStyle: {
    width: '100%',
  },
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
    paddingBottom: 10,
    borderBottomColor: '#002F49',
    borderBottomWidth: 1,
  },
  form: {
    width: '70%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 80,
    resizeMode: 'contain',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 20,
    color: '#222222',
    fontSize: 20,
    paddingLeft: 4,
  },
  text: {
    color: '#002F49',
    fontSize: 20,
    textAlign: 'left',
    margin: 4,
  },
  button: {
    color: 'blue',
    padding: 10,
    paddingHorizontal: 25,
    backgroundColor: '#FFB20C',
    borderRadius: 8,
    margin: 3,
  },
  logOutButton: {
    position: 'absolute',
    right: 0,
    color: 'blue',
    padding: 10,
    paddingHorizontal: 25,
    backgroundColor: '#FFB20C',
    borderRadius: 8,
    margin: 3,
  },
  buttonText: {
    fontSize: 25,
    textAlign: 'center',
  },
  buttonTextLight: {
    color: '#FFB20C',
    fontSize: 22,
    textDecorationLine: 'underline',
  },
  buttons: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    margin: 16,
  },
  alternative: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  logoSmall: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});
