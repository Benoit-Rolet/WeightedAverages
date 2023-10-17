/*
TODO : nettoyage ! commentaires, dossiers, etc.
*/

// React
import { useState } from 'react';
// Components
import Addition from '../Addition';
import Results from '../Results';
// Style
import './styles.css';

function App() {
  // State allowing both components to communicate over the results
  const [resultNonWeighted, setResultNonWeighted] = useState('NC');
  const [resultWeighted, setResultWeighted] = useState('NC');

  return (
    <div className="app">
      <h1>Calcul de moyenne et de moyenne pondérée</h1>
      <div className="wrapper">
        <div className="left">
          <Addition setResultNonWeighted={setResultNonWeighted} setResultWeighted={setResultWeighted} />
        </div>
        <div className="right">
          <Results resultNW={resultNonWeighted} resultW={resultWeighted} />
        </div>
      </div>
    </div>
  );
}

export default App;
