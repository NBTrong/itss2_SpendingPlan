import './App.css';

import Income from './components/Income/Income.js'
import Login from './components/Login'
import Spending from './components/Spending/Spending.js'
import { useState } from 'react'

function App() {
  const [ tab, setTab ] = useState("income")
  return (
    <div className="App">
      {tab === 'income' && <Income setTab={setTab} />}
      {tab === 'spending' && <Spending setTab={setTab} />}
      {tab === 'login' && <Login />}
    </div>
  );
}

export default App;
