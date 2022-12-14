import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { database } from '../../../misc/firebase';
import { transformToArrayWithId } from '../../../misc/helpers';
import MessageItem from './MessageItem';

const Messages = () => {
  const {chatId} = useParams()
  const [messages, setMessages] = useState(null);

  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;

  useEffect(()=>{
    const messageRef = database.ref('messages');

    messageRef.orderByChild('roomId').equalTo(chatId).on('value', (snap)=>{

      const data = transformToArrayWithId(snap.val());
      setMessages(data);
    })

    return ()=>{
      messageRef.off('value');
    }

  },[chatId])

  return (

    <ul className='msg-list custom-scroll' >
      {isChatEmpty && <li>No message yet</li>}
      {canShowMessages && messages.map(msg=> <MessageItem key={msg.Id} message={msg} /> ) }
    </ul>
  )
}

export default Messages