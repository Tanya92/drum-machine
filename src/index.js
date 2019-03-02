import React, { Component } from 'react';
import { render } from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import PlaySound from './play-sound';
import {playReducer} from './play-reducer'; 
import './style.css';

const store = createStore(playReducer);
class App extends Component {
  
  render() {
    return (
      <Provider store = {store}>
        <PlaySound/>
      </Provider>
    )
  };
}

render(<App />, document.getElementById('root'));
