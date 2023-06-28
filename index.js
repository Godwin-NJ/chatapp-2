const express = require("express");
const app = express();
const PORT = 4000;
const { createServer } = require("http");
const httpServer = createServer(app);
const cors = require("cors");
const { Server } = require("socket.io");

// Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  //sends the message to all the users on the server
  socket.on("message", (data) => {
    io.emit("messageResponse", data);
  });

  //Listens when a new user joins the server
  socket.on("newUser", (data) => {
    //Adds the new user to the list of users
    users.push(data);
    // console.log(users);
    //Sends the list of users to the client
    io.emit("newUserResponse", users);
  });

  socket.on("typing", (data) => socket.broadcast.emit("typingResponse", data));
  socket.on("noTyping", (data) =>
    socket.broadcast.emit("noTypingResponse", data)
  );

  // //Listens and logs the message to the console
  // socket.on("message", (data) => {
  //   console.log(data);
  // });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    io.emit("newUserResponse", users);
    socket.disconnect();
  });
});

// middlewares
app.use(cors());

// routes
app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
