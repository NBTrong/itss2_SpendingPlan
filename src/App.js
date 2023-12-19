import { useEffect, useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {
  useRecoilState,
} from 'recoil';
import { v4 as uuidV4 } from 'uuid';

import Income from './components/Income/Income.js'
import Login from './components/Login'
import Spending from './components/Spending/Spending.js'
import Plan from './components/Plan'
import Dashboard from './components/Dashboard'
import userKeyAtom from './storage/userKeyAtom.js'

import './App.css';

function App() {
  const queryClient = new QueryClient()
  const [tab, setTab] = useState("income")
  const [, setUserKey] = useRecoilState(userKeyAtom)

  const initUserKey = () => {
    let _userKey = localStorage.getItem("userKey");

    if (!_userKey) {
      _userKey = uuidV4();
      localStorage.setItem('userKey', _userKey);
    }

    setUserKey(_userKey);
  };

  useEffect(() => {
    initUserKey();
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {tab === 'dashboard' && <Dashboard setTab={setTab} />}
        {tab === 'income' && <Income setTab={setTab} />}
        {tab === 'spending' && <Spending setTab={setTab} />}
        {tab === 'plan' && <Plan setTab={setTab} />}
        {tab === 'login' && <Login setTab={setTab} />}
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  );
}

export default App;
