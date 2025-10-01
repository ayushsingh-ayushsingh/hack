import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        console.log("a user connected", socket.id);

        socket.on("joinRoom", (room) => {
            socket.join(room);
            console.log(`User ${socket.id} joined room: ${room}`);
            io.to(room).emit("message", `User ${socket.id} has joined the room.`);
        });

        socket.on("leaveRoom", (room) => {
            socket.leave(room);
            console.log(`User ${socket.id} left room: ${room}`);
            io.to(room).emit("message", `User ${socket.id} has left the room.`);
        });

        socket.on("disconnect", () => {
            console.log("user disconnected");
        });

        socket.on("message", (data: { room: string; message: string }) => {
            console.log(`message in room ${data.room}: ${data.message}`);
            io.to(data.room).emit("message", JSON.stringify(data.message));
        });
    });

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});