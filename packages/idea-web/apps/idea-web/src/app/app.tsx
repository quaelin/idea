import React from 'react';
import { IdeaWell } from '../components/IdeaWell';

import './app.css';

export function App() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./app.css file.
   */
  return (
    <div className="app">
      <header className="app-header flex">
        <h1>
          <span role="img" aria-label="Idea">💡</span>
        </h1>
      </header>
      <main>
        <IdeaWell />
      </main>
    </div>
  );
}

export default App;
