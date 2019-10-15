'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  post: {
    flexDirection: 'column',
    width: '90%',
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderColor: '#002F49',
    borderWidth: 2,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
  },
  track: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  iconWrap: {
    marginLeft: 10,
    flex: 1,
  },
  authorName: {
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  myTrack: {
    flexDirection: 'row-reverse',
  },
  myPost: {
    alignItems: 'flex-end',
  },
  slider: {
    width: '70%',
  },
});
