import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [message, setMessage]  = useState("")
  const [ chat, setChat ] = useState("");

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection established');
      newSocket.send('Hello Server!');
      setSocket(newSocket);
    }
    newSocket.onmessage = (message) => {
      setMessage(message.data)
    }    
    return () => newSocket.close();
  }, [])

  if(!socket){
    return (
      <div>Socket connecting to server ...</div>
    )
  }

  return (
    <>
    <input type="text" onChange={e=>{
      setChat(e.target.value)
    }}/>

    <button onClick={()=>{
      socket.send(chat);
    }}>Send</button>
      {message}
    </>
  )
}

export default App