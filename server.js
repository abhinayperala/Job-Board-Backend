require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");


const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");


const app = express();


app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);


connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("jobPosted", (job) => {
        io.emit("newJob", job); 
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
