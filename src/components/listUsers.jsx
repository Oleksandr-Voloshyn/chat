import React, { useState } from 'react';
import './listUsers.css'
import ava from './../image/cat1.jpg'
import { useDispatch } from 'react-redux';
import { addMessage } from '../store/reduxUsers';
import { useSelector } from 'react-redux';



const ListUsers = () => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()
    const users = useSelector(state => state.reduxUsers.users)


    const addMessages = (messages) => {
        dispatch(addMessage(messages))
    }

    const filterUsers = users.filter(user => {
        return user.name.toLowerCase().includes(value.toLowerCase())
    })


    return <div className='block-list-users'>
        <div className='block-ava-search'>
            <div className='ava-name'>
                <img src={ava} className='ava' />
                <h3> Sasha </h3>
            </div>
            <div className='block-search'>
                <input
                    type='search'
                    placeholder='Search or start new chat'
                    className='search'
                    onChange={(event) => setValue(event.target.value)}
                />
            </div>
        </div>
        <div className='list-users'>
            <h3> Chats</h3>
            {filterUsers.map(user => {
                return <div className='user'
                    key={user.id}
                    onClick={() => addMessages(user.id)}
                >
                    <img src={user.photo} />
                    <div className='lastMessage'>
                        <span >{user.name}</span><br />
                        <span >{user.messages[user.messages.length - 1].message}</span>
                    </div>
                    <div className='block-time'>
                        <p className='user-time'>{user.messages[user.messages.length - 1].time}</p>
                    </div>
                </div>
            })}
        </div>
    </div>;
};

export default ListUsers;
