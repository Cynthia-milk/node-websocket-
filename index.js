const express=require('express');
const app=express();
const http=require('http').Server(app);
const io=require('socket.io')(http);

const path=require('path');
app.use(express.static(path.join(__dirname, 'static')));
 app.get('/',(req,res)=>{
    //  res.send('<h1>Hello World</h1>');// 输出的html代码
    res.sendFile(__dirname + '/index.html');

 })

 
  // 集成socket.io服务
  io.on('connection',socket=>{
      console.log('a user connectd')
      socket.on('chat message',msg=>{
          console.log('message:',msg);
          socket.emit('chat message',msg);
      })
      // 每个socket都会触发一个disconnect事件
      socket.on('disconnect',()=>{
          console.log('user disconnect');
      })
      

  })
 http.listen(3000,()=>{
     console.log('listening on *:3000');
 })