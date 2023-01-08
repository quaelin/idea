import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app/app';

const container = document.getElementById('root');
const root = createRoot(container);

// Note: Had to disable StrictMode here because react-beautiful-dnd doesn't yet
// work properly with it under React 18, see
// https://github.com/atlassian/react-beautiful-dnd/issues/2350
root.render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
);
