import { Server } from "socket.io";
import express from "express";
import http from "http";
const app=express();

const server =http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: "http://localhost:5173",
    // origin:
  },
});

let onlineUser = [];
console.log(onlineUser);

const addUser = (userId, socketId) => {
  const userExits = onlineUser.find((user) => user.userId === userId);
  if (!userExits) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
  

  
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    console.log(onlineUser)
   
  });
  console.log(onlineUser);
  socket.on("sendMessage", ({ receiverId, data }) => {
    console.log(data);
    console.log(receiverId);
    const receiver = getUser(receiverId);
    
    
    io.to(receiver.socketId).emit("getMessage", data);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

// io.listen("4001");
export {app,io,server}