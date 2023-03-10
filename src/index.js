import React from 'react';
import ReactDOM from 'react-dom';
import { Router, BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import PiwikReactRouter from 'piwik-react-router';

import App from './components/App';

import rootReducer from './store/reducers/rootReducer';
import history from './components/Shared/history';

const store = createStore(rootReducer, applyMiddleware(thunk));

if(process.env.NODE_ENV === "production") {
  // Matomo/Piwik Setup
  const piwik = PiwikReactRouter({
    url: 'https://analytics.cdadityang.xyz',
    siteId: 3
  });

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={ store }>
        <Router history={piwik.connectToHistory(history)} basename={process.env.PUBLIC_URL}>
          <App />
        </Router>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
} else {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={ store }>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}
