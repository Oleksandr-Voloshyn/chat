
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Chat from './components/Chat';
import ListUsers from './components/listUsers';
import { dataUsers } from './dataUsers/dataUsers';
import { addUsers } from './store/reduxUsers';


function App() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.reduxUsers.users)
  const id = useSelector(state => state.reduxUsers.id)
  useEffect(() => {
    let localUsers = (JSON.parse(localStorage.getItem('dataUsers')) !== null)
      ?
      (JSON.parse(localStorage.getItem('dataUsers')))
      :
      dataUsers;
    console.log((JSON.parse(localStorage.getItem('dataUsers'))) === null)
    dispatch(addUsers(localUsers))
  }, [])


  return (
    <div className='fon'>
      <ListUsers />
      {id !== null &&
        < Chat />}
    </div>
  );
}

export default App;
