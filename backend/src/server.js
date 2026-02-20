const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

app.set("io", io);

app.use(express.json());
app.use(cors());

app.use("/api/experts", require("./routes/expertRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

app.get("/", (req, res) => {
  res.send("🚀 API Running...");
});

const errorHandler = require("./middleware/errorMiddleware");
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});
