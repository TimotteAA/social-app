const io = require("socket.io")(8900, {
  cors: {
    origin: "*",
  },
});

let users = [];

// 过滤，socketId一直在变
const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

// 监听io连接

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

// 监听连接
io.on("connection", (socket) => {
  console.log("a user connected");
  // 每次建立连接后，就收集socket.id与client.id
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);

    // console.log(users);
  });

  // 转发消息
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    // console.log(senderId, receiverId, text);
    // 转发给另一个用户
    const user = getUser(receiverId);
    if (!user) return;
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  // 监听断开连接
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    console.log(users);
    const idx = users.findIndex((user) => user.socketId === socket.id);
    users.splice(idx, 1);
    console.log(users);
    io.emit("getUsers", users);
  });
});
