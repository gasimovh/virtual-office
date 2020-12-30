const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    credentials: true
  }
});

const users = [];

io.on("connection", (socket) => {
  console.log(`${socket.id} connected.`);
  users.push(socket.id);

  socket.emit("yourID", socket.id);
  io.sockets.emit("allUsers", users);

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-disconnected", socket.id);
    users.splice(users.indexOf(socket.id), 1);
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("hey", {
      signal: data.signalData,
      from: data.from
    });
  });

  socket.on("acceptCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

server.listen(8000, () => console.log("server is running on port 8000"));

// const app = require("express")();
// const http = require("http").Server(app);
// const io = require("socket.io")(http, {
//   cors: {
//     origin: "http://localhost:8080",
//     methods: ["GET", "POST"],
//     credentials: true
//   }
// });

// let users = [];
// let messages = [];
// let rooms = [
//   {
//     capacity: 10,
//     seats: [
//       { isOccupied: false, occupier: null },
//       { isOccupied: false, occupier: null },
//       { isOccupied: false, occupier: null },
//       { isOccupied: false, occupier: null },
//       { isOccupied: false, occupier: null },
//       { isOccupied: false, occupier: null },
//       { isOccupied: false, occupier: null },
//       { isOccupied: false, occupier: null },
//       { isOccupied: false, occupier: null },
//       { isOccupied: false, occupier: null }
//     ]
//   },
//   {
//     capacity: 8,
//     seats: [
//       { isOccupied: false, occupier: null },
//       { isOccupied: false, occupier: null },
//       { isOccupied: false, occupier: null },
//       { isOccupied: false, occupier: null },
//       { isOccupied: false, occupier: null },
//       { isOccupied: false, occupier: null },
//       { isOccupied: false, occupier: null },
//       { isOccupied: false, occupier: null }
//     ]
//   },
//   {
//     capacity: 6,
//     seats: [
//       { isOccupied: false, occupier: null },
//       { isOccupied: false, occupier: null },
//       { isOccupied: false, occupier: null },
//       { isOccupied: false, occupier: null },
//       { isOccupied: false, occupier: null },
//       { isOccupied: false, occupier: null }
//     ]
//   },
//   {
//     capacity: 4,
//     seats: [
//       { isOccupied: false, occupier: null },
//       { isOccupied: false, occupier: null },
//       { isOccupied: false, occupier: null },
//       { isOccupied: false, occupier: null }
//     ]
//   }
// ];
// let index = 0;

// //debug

// io.on("connection", (socket) => {
//   socket.emit("loggedIn", {
//     users: users.map((s) => s.username),
//     messages: messages
//   });

//   //sends rooms' info
//   socket.emit("rooms", rooms);

//   socket.on("newuser", (username) => {
//     console.log(`${username} has arrived at the party.`);
//     socket.username = username;

//     users.push(socket);

//     io.emit("userOnline", socket.username);
//   });

//   socket.on("seatNumber", (seatNumber) => {
//     rooms[0].seats[seatNumber].occupier = socket.id;

//     io.emit("seatNumber", seatNumber);
//   });

//   socket.on("msg", (msg) => {
//     let message = {
//       index: index,
//       username: socket.username,
//       msg: msg
//     };

//     messages.push(message);

//     io.emit("msg", message);

//     index++;
//   });

//   // Disconnect
//   socket.on("disconnect", () => {
//     console.log(`${socket.username} has left the party.`);
//     io.emit("userLeft", socket.username);
//     users.splice(users.indexOf(socket), 1);
//   });
// });

// http.listen(process.env.PORT || 3000, () => {
//   console.log("Listening on port %s", process.env.PORT || 3000);
// });
