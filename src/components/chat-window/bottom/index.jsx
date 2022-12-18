import React, { useCallback, useState } from 'react'
import { Alert, Icon, Input, InputGroup } from 'rsuite'
import firebase from 'firebase/app'
import { useProfile } from '../../../context/ProfileContext'
import { useParams } from 'react-router'
import { database } from '../../../misc/firebase'


function assembelMessage(profile, chatId) {
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      createdAt: profile.createdAt,
      ...(profile.avatar ? { avatar: profile.avatar } : {})
    },
    createdAt: firebase.database.ServerValue.TIMESTAMP,
  }
}


const Bottom = () => {

  const [input, setInput] = useState('');
  const { chatId } = useParams();
  const { profile } = useProfile();
  const [isLoading, setIsLoading] = useState(false);

  const onInputChange = useCallback((value) => {
    setInput(value)
  }, []);

  const onSendClick = async () => {

    if (input.trim() === '') {
      return;
    };

    const msgData = assembelMessage(profile, chatId)
    msgData.text = input;

    const updates = {};

    const messageId = database.ref('messages').push().key;
    console.log(messageId);

    updates[`/messages/${messageId}`] = msgData;
    updates[`/rooms/${chatId}/lastMessage`] = {
      ...msgData,
      msgId: messageId,
    };

    setIsLoading(true);
    try {
      await database.ref().update(updates);
      setInput('');
      setIsLoading(false);

    } catch (err) {
      setIsLoading(false);
      Alert.error(err.message, 4000);
    }

  };

  const onKeyDown = (ev)=>{
    if(ev.keyCode === 13){
      ev.preventDefault();
      onSendClick();
    }
  }

  return (
    <div>
      <InputGroup>
        <Input
          placeholder="Write a new message here..."
          value={input}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
        />
        <InputGroup.Button
          color='blue'
          appearence='primary'
          onClick={onSendClick}
          disabled={isLoading}
        >
          <Icon icon='send' />
        </InputGroup.Button>
      </InputGroup>
    </div>
  )
}

export default Bottom