import React, { useState } from 'react';

import './App.css';

import Timer from './Components/Timer/Timer'

function App() {
  const [time, setTime] = useState(10)
  return (
    <div className="App">
      <header className="App-header">
        <input type='number' onChange={e => setTime(parseInt(e.target.value))} value={time}/>
        <Timer initialTime={time * 1000} onExpiration={() => setTime(time + 1)}/>
      </header>
    </div>
  );
}

export default App;
