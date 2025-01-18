import express from "express";
import { createServer } from "http";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import userRouter from "./routes/user.route";
import { initializeSocket } from "./socket";

dotenv.config();

const app = express();
const httpServer = createServer(app);

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/users", userRouter);
app.get('/', (req, res) => {
    res.json({ message: "this is / endpoint" })
})

// Initialize Socket.io
initializeSocket(httpServer);

// Start the server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});