require("dotenv").config();
const express = require("express");
const cors = require("cors");

const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");

connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

app.use(
  "/api/tasks",
  require("./routes/taskRoutes")
);

app.use(
  "/api/classrooms",
  require(
    "./routes/classroomRoutes"
  )
);

app.use(
  "/api/classrooms",
  require(
    "./routes/classroomTaskRoutes"
  )
);

app.use(
  "/api/classrooms",
  require(
    "./routes/classroomNoteRoutes"
  )
);
app.use(
  "/api/classrooms",
  require(
    "./routes/classroomChatRoutes"
  )
);
app.use(
  "/api/events",
  require("./routes/eventRoutes")
);

app.use(
  "/api/profile",
  require(
    "./routes/profileRoutes"
  )
);

app.use(
  "/api/materials",
  require(
    "./routes/materialRoutes"
  )
);

app.use(
  "/api/leaderboard",
  require(
    "./routes/leaderboardRoutes"
  )
);

io.on("connection", (socket) => {

  console.log(
    "User connected:",
    socket.id
  );

  socket.on(
    "joinClassroom",
    (classroomId) => {

      if (!classroomId) return;

      socket.join(classroomId);

      console.log(
        `Socket ${socket.id} joined classroom ${classroomId}`
      );

    }
  );

  socket.on(
    "leaveClassroom",
    (classroomId) => {

      if (!classroomId) return;

      socket.leave(classroomId);

      console.log(
        `Socket ${socket.id} left classroom ${classroomId}`
      );

    }
  );

  socket.on(
    "sendMessage",
    (data) => {

      if (!data?.classroomId) return;

      socket
        .to(data.classroomId)
        .emit(
          "receiveMessage",
          data
        );

    }
  );

  socket.on(
    "messageDeleted",
    (data) => {

      if (
        !data?.classroomId ||
        !data?.messageId
      ) return;

      socket
        .to(data.classroomId)
        .emit(
          "messageDeleted",
          {
            messageId:
              data.messageId
          }
        );

    }
  );

  socket.on(
    "messageEdited",
    (data) => {

      if (
        !data?.classroomId ||
        !data?.messageId
      ) return;

      socket
        .to(data.classroomId)
        .emit(
          "messageEdited",
          {
            messageId:
              data.messageId,

            message:
              data.message
          }
        );

    }
  );

  socket.on(
    "disconnect",
    () => {

      console.log(
        "User disconnected:",
        socket.id
      );

    }
  );

});

app.get("/", (req, res) => {
  res.send("Padhlo API Running");
});

const PORT =
  process.env.PORT || 5000;

server.listen(
  PORT,
  () => {

    console.log(
      `Server running on ${PORT}`
    );

  }
);