import './App.css';

import Income from './components/Income'
import Login from './components/Login'
import Spending from './components/Spending'
import SignUp from './components/SignUp'
import Plan from './components/Plan'
import Dashboard from './components/Dashboard'
import { useState } from 'react'

function App() {
  const [ tab, setTab ] = useState("dashboard")
  return (
    <div className="App">
      {tab === 'dashboard' && <Dashboard setTab={setTab} />}
      {tab === 'income' && <Income setTab={setTab} />}
      {tab === 'spending' && <Spending setTab={setTab} />}
      {tab === 'plan' && <Plan setTab={setTab} />}
      {tab === 'login' && <Login setTab={setTab}/>}
      {tab === 'signup' && <SignUp setTab={setTab}/>}
    </div>
  );
}

export default App;
