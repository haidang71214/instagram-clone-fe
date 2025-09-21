import React, { useState } from 'react'
import {io} from 'socket.io-client'
// tạo đối tượng client cho fe
const socket = io("ws://localhost:8080");
console.log(socket.id);


socket.on('send-newnum',(data)=>{
  // data sẽ là number
  document.getElementById('noidung').innerHTML = data
}) // on là hứng, emmit là bắn
export default function Socket() {
  const [value, setValue] = useState(0)
  return (
    <div>
      <button onClick={()=>{
        socket.emit('send-click',"")// ban event di
       setValue(value+1) 
      }}>click</button>
  <div id='noidung'>0</div>
      <button onClick={()=>{
        socket.emit('hehe',"") //
      }}></button>
    </div>
  )
}
