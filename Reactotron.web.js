import Reactotron from 'reactotron-react-js';

/* global __DEV__ */

__DEV__ && Reactotron
  .configure()
  .connect();

export default Reactotron;
