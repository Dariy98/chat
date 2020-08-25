const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const mongoose = require("mongoose");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("connect new....");

  //WELCOME CURRENT USER
  socket.emit("message", "Welcome to chat");

  //USER connect
  socket.broadcast.emit("message", "user online");

  //when user disconnect
  socket.on("disconnect", () => {
    io.emit("message", "ofline user.");
  });

  //listen for chatmessage
  socket.on("chatMessage", (message) => {
    io.emit("message", message);
  });
});

app.use(express.static("public"));
// app.use("/public", express.static("public"));

async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://ost:1q2w3e@cluster0.y9jnl.mongodb.net/chat?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useFindAndModify: false,
      }
    );
  } catch (e) {
    console.log("error.....", e);
  }
}

server.listen(3000, () => console.log("server....."));
// server.listen(3000, () => {
//   start();
//   console.log("server.....");
// });
// server.listen(3000, start);
