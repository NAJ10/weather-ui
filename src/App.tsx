import React from 'react';
import './App.css';
import WeatherUI from './weatherui';

function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <WeatherUI city="Cardiff" />
      </header>
    </div>
  );
}

export default App;
