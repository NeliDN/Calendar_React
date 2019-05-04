import React from 'react';
import ReactDOM from 'react-dom';

import Application from './Application';
import * as serviceWorker from './serviceWorker';
import './styles/global.css';

ReactDOM.render(<Application/>, document.getElementById('application-root'));

serviceWorker.unregister();
