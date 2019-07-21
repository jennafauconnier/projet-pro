import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import Room from './components/Room';
import { Provider } from 'react-redux';
import configureStore from './redux/store';
import { initialState } from './redux/reducer';
import { PersistGate } from 'redux-persist/integration/react';

//Route me permet d'afficher le composant lorsque la route route / est appelé.
const { store, persistor } = configureStore(initialState);

class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App">
            <div id="background"></div>
            <div className="chat_main">
              <div className="chat_col-main">
                <div className="chat_container">
                  <Router>
                    <Header />
                    <Switch>
                      <Route path="/login" component={Login} />
                      <Route path="/room/:roomName" component={Room} />
                      <Route path="/" component={Home} />
                    </Switch>
                  </Router>
                </div>
              </div>
            </div>
          </div>
        </PersistGate>
      </Provider>
    )
  }
}

export default App;
