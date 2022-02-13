import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './Chat.css'
import { pushMessagesUsers } from '../store/reduxUsers';

import send from './../image/send.png';

const Chat = () => {
    const [value, setValue] = useState('')
    const [randomMessage, setRandomMessage] = useState('')
    const [numberUser, setNumberUser] = useState('')

    const dispatch = useDispatch();
    const userId = useSelector(state => state.reduxUsers.id)
    const users = useSelector(state => state.reduxUsers.users)
    let time = new Date().toLocaleString();

    useEffect(() => {
        localStorage.setItem('dataUsers', JSON.stringify(users))
    }, [users[userId - 1].messages.length])

    useEffect(() => {
        const id = users.findIndex(sas => sas.id === userId)
        setNumberUser(id)

    }, [userId])

    useEffect(() => {
        if (randomMessage) {
            dispatch(pushMessagesUsers({ message: randomMessage, id: randomMessage.id }))
        }
    }, [randomMessage])


    const getRandomMessage = (userId) => {

        fetch('https://api.chucknorris.io/jokes/random')
            .then(response => response.json())
            .then(data => dispatch(setRandomMessage({
                name: users[numberUser].name,
                time,
                message: data.value,
                id: userId
            })));
    }


    const sendValue = () => {
        const yourMessage = { name: 'You', message: value, time }
        dispatch(pushMessagesUsers({ message: yourMessage, id: userId }))

        const timer = setTimeout(() => dispatch(getRandomMessage(userId)), 5000)
        return () => clearTimeout(timer)
    }


    return <div className='blok-chat'>

        {users[numberUser] !== undefined && <>

            <div className='cap-chat'>
                <img
                    src={users[numberUser].photo} alt=""
                    className='cap-chat-photo'
                />
                <h3>
                    {users[numberUser].name}
                </h3>
            </div>
            <div className='all-chat'>
                {users[numberUser].messages.map(message => {
                    return <>{(message.name === users[numberUser].name) ?
                        <div className='block-message-from-user' key={message.name}>
                            <img src={users[numberUser].photo} className='cap-chat-photo' />
                            <div className='user-message-time'>
                                <p className='message-from-user'>{message.message}</p>
                                <p className='data-user'> {message.time}</p>
                            </div>
                        </div> :
                        <div className='block-message-from-you'>
                            <p className='message-from-you'>{message.message}</p>
                            <p className='data-user'> {message.time}</p>
                        </div>
                    } </>

                })}

            </div>
            <div className='block-send-message'>
                <input
                    type='search'
                    className='send-message'
                    onChange={(event) => setValue(event.target.value)}
                />
                <img
                    src={send}
                    onClick={() => sendValue()}

                />
            </div>
        </>
        }


    </div >;
};

export default Chat;
