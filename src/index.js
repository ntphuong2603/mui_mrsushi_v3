import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Route';
import MrSushiStore from './store/store'
import {Provider} from 'react-redux'

ReactDOM.render(
    <Provider store={MrSushiStore()}>
      <Routes/>
    </Provider>
  ,document.getElementById('root')
);
