import { Server as SocketServer } from "socket.io";

let io: SocketServer;

export const initializeSocket = (server: any) => {
    io = new SocketServer(server, {
        cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });

        socket.on('leaderBoardUpdated', () => {
            console.log("user data is updated, now its time to update leaderboard")
            io.emit('update')
        })
    });
};

export {io};

export const getIo = () => {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    return io;
};