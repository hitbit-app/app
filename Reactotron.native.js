import Reactotron from 'reactotron-react-native';

/* global __DEV__ */

// Reactotron is a RN inspector for
// easier debugging. Change .configure() to
//  .configure({ host: '<your Expo IP>' })
// https://github.com/infinitered/reactotron/
__DEV__ && Reactotron
  .configure()
  .useReactNative()
  .connect();
