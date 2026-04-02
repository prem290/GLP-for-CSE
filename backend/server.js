require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./routes/auth");
const quizRoutes = require("./routes/quiz");
const leaderboardRoutes = require("./routes/leaderboard");
const challengeRoutes = require("./routes/challenges");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/challenges", challengeRoutes);

// Socket.IO for real-time quiz battles
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  
  socket.on("join_battle", (userId) => {
    socket.join("battle_room");
    io.to("battle_room").emit("message", `${userId} joined the battle!`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

// Since this is dummy test, if no MONGO_URI, don't crash
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));
} else {
  console.log("No MONGO_URI provided, starting without DB connection.");
}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
