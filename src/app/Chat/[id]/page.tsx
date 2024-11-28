import CustomerChatPage from '@/components/Chat_Dashboard'
import React from 'react'

const Chat = ({ params }: { params: { id: string } }) => {
  return (
    <div>
    <CustomerChatPage id={params.id} />

    </div>
  )
}

export default Chat
