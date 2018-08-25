import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './bootstrap.css';
import "../node_modules/react-table/react-table.css";

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
