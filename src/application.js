import React from 'react';
import ReactDOM from 'react-dom';

import CanvasApp from './DanCanvas';

window.addEventListener('load', () => {
  ReactDOM.render(<CanvasApp/>, window.document.getElementById('react-container'));
});
