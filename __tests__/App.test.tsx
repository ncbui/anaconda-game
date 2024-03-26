/**
 * @format
 */

import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import App from '../App';
import {it} from '@jest/globals';


it('renders with title', () => {
  const title="Anaconda"
  const app = renderer.create(<App />).toJSON;
  
});
