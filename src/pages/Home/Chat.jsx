import React from 'react'
import { useRooms } from '../../context/roomsContext'
import { useParams } from 'react-router'
import { Loader } from 'rsuite'
import ChatTop from '../../components/chat-window/top'
import Messages from '../../components/chat-window/messages'
import ChatBottom from '../../components/chat-window/bottom'
import { CurrentRoomProvider } from '../../context/current-room.context'

const Chat = () => {

  const {chatId} = useParams();
  
  const rooms = useRooms();

  // console.log(chatId);
  // console.log(rooms);

  if (!rooms) {
   return <Loader center vertical size='md' content='Loading' speed='slow' />
  }

  const currentRoom = rooms.find( room => room.id === chatId);

  // console.log(currentRoom);

  if (!currentRoom) {
    return <h6 className='text-center mt-page' >Chat {chatId} not found</h6>
  }

  const {name, description} = currentRoom;

  const currentRoomData ={
    name , description
  }

  return (
    <CurrentRoomProvider data={currentRoomData} >
    <div className='chat-top' >
      <ChatTop/>
    </div>
    <div className='chat-middle'>
      <Messages/>
    </div>
    <div className='chat-bottom'>
      <ChatBottom/>
    </div>
    </CurrentRoomProvider>
  )
}

export default Chat