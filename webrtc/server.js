import express from "express";
import http from "http";
import { v4 as uuidV4 } from "uuid";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const PORT = 3005;

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (_req, res) => {
    res.redirect(`/${uuidV4()}`);
});

app.get("/:room", (req, res) => {
    res.render("room", { roomId: req.params.room });
});

// Socket.io handling
io.on("connection", socket => {
    socket.on("join-room", (roomId, userId) => {
        console.log(`User ${userId} joined room ${roomId}`);
        socket.join(roomId);
        socket.to(roomId).emit("user-connected", userId);

        socket.on("disconnect", () => {
            console.log(`User ${userId} disconnected from room ${roomId}`);
            socket.to(roomId).emit("user-disconnected", userId);
        });
    });
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
