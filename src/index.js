import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, HashRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Favorites from './components/Favorites';
import ApiHandler from './components/ApiHandler'
import The404Page from './components/pageNotFound/The404Page';


const routing = (
  <Router basename='/'>
	<Switch>
	  
		<Route exact path="/" component={App} />
		<Route path="/favorites" component={Favorites} />
		<Route path="/results" component={ApiHandler} />
		<Route path="*" component={The404Page}/>
	  
	</Switch>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
