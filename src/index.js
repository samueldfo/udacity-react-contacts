import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// ReactDom renders the elements created in react
// App extends Component, that allows us to group multiple elements
// root is the top node of html dom
// Dom -> Document Object Model, is the tree of html elements
// the second argument document.getElementById('root')) is where it will render
// JSX allows us to use html similar syntax to make simple to join html and javascript, so we can get rid of get createElement functions
// BrowserRouter allows us to create a navigation history and use it on our route render, see A pp.js

ReactDOM.render(
<BrowserRouter><App /></BrowserRouter>, 
document.getElementById('root'));
registerServiceWorker();
