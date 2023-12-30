import { useCallback, useEffect, useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {
  useRecoilState,
} from 'recoil';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Income from './components/Income/Income.js'
import Login from './components/Login'
import Spending from './components/Spending/Spending.js'
import Plan from './components/Plan'
import Dashboard from './components/Dashboard'
import Register from './components/Register/index.js';
import userKeyAtom from './storage/userKeyAtom.js'

import './App.css';

function App() {
  const queryClient = new QueryClient()
  const [tab, setTab] = useState("income")
  const [userKey, setUserKey] = useRecoilState(userKeyAtom)

  const checkUserKey = useCallback(() => {
    let _userKey = localStorage.getItem("userKey");

    setUserKey(_userKey);
  }, [setUserKey]);

  useEffect(() => {
    checkUserKey();
  }, [checkUserKey])

  useEffect(() => {
    if (userKey) {
      setTab("dashboard")
    } else {
      setTab("login")
    }
  }, [userKey])

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {tab === 'dashboard' && <Dashboard setTab={setTab} />}
        {tab === 'income' && <Income setTab={setTab} />}
        {tab === 'spending' && <Spending setTab={setTab} />}
        {tab === 'plan' && <Plan setTab={setTab} />}
        {tab === 'login' && <Login setTab={setTab} />}
        {tab === 'register' && <Register setTab={setTab} />}
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer />
    </QueryClientProvider>

  );
}

export default App;
