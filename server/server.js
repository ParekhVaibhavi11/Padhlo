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
io.on(
  "connection",
  (socket) => {

    console.log(
      "User Connected:",
      socket.id
    );

    socket.on(
      "joinClassroom",
      (classroomId) => {

        socket.join(
          classroomId
        );

      }
    );

    socket.on(
      "sendMessage",
      (data) => {
        socket.on(
  "messageDeleted",
  (data) => {

    io.to(
      data.classroomId
    ).emit(
      "messageDeleted",
      data
    );

  }
);

socket.on(
  "messageEdited",
  (data) => {

    io.to(
      data.classroomId
    ).emit(
      "messageEdited",
      data
    );

  }
);

        io.to(
          data.classroomId
        ).emit(
          "receiveMessage",
          data
        );

      }
    );

    socket.on(
      "disconnect",
      () => {

        console.log(
          "User Disconnected"
        );

      }
    );

  }
);
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